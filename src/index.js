import XRegExp from 'xregexp'

function evaluateArg ({path, index, fallback, fallbackTrigger}) {
  const args = path.get('arguments')
  if (args.length < index + 1) {
    return fallback
  }
  const arg = args[index].evaluate()
  if (!arg.confident || typeof arg.value !== 'string') {
    return
  }
  return arg.value !== fallbackTrigger ? arg.value : fallback
}

function getPattern (path) {
  if (path.node.arguments.length === 0) {
    return '(?:)'
  }
  const firstArg = path.node.arguments[0]
  if (firstArg.type === 'TemplateLiteral' && firstArg.quasis.length === 1) {
    // TODO handle substitutions
    const raw = firstArg.quasis[0].value.raw
    // Handle \\\\1 -> \\1. In templates \\1 should be used instead of
    // \1 since \1 is treated as an octal number, which is not allowed
    // in template strings. Copied from
    // https://github.com/DmitrySoshnikov/babel-plugin-transform-modern-regexp/blob/78274325c7d0da329f7057e8f094a1ccae06a968/index.js#L150-L153
    return raw.replace(/\\\\(\d+)/g, '\\$1')
  }

  return evaluateArg({path, index: 0, fallback: '(?:)', fallbackTrigger: ''})
}

function getFlags (path) {
  return evaluateArg({path, index: 1, fallback: ''})
}

function createRegExpLiteral (path, t) {
  const pattern = getPattern(path)
  const flags = getFlags(path)

  if (pattern == null || flags == null) {
    return
  }

  const xregexp = new XRegExp(pattern, flags)

  return t.regExpLiteral(xregexp.source, xregexp.flags)
}

function maybeReplaceWithRegExpLiteral (path, t) {
  if (!t.isIdentifier(path.node.callee, {name: 'RegExp'})) {
    return
  }
  const regExpLiteral = createRegExpLiteral(path, t)
  if (regExpLiteral) {
    path.replaceWith(regExpLiteral)
  }
}

export default function ({ types: t }) {
  return {
    visitor: {
      NewExpression (path) {
        maybeReplaceWithRegExpLiteral(path, t)
      },
      CallExpression (path) {
        // equivalent to `new RegExp()` according to §21.2.3
        maybeReplaceWithRegExpLiteral(path, t)
      },
      RegExpLiteral (path) {
        const { node } = path

        const xregexp = XRegExp(node.pattern, node.flags)
        const { source, flags } = xregexp

        if (source !== node.pattern || flags !== node.flags) {
          path.replaceWith(t.RegExpLiteral(source, flags))
        }
      },
      MemberExpression (path) {
        const { node: { object, property } } = path

        if (object.type === 'RegExpLiteral' && property.name === 'source') {
          path.replaceWith(t.StringLiteral(object.pattern))
        }
      }
    }
  }
}
