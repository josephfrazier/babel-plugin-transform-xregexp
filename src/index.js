import XRegExp from 'xregexp'

function createRegExpLiteral (args, t) {
  const evaluatedArgs = args.map((a) => a.evaluate())
  if (!evaluatedArgs.every((a) => a.confident === true &&
      typeof a.value === 'string')) {
    return
  }
  const pattern = (evaluatedArgs.length >= 1 &&
                    evaluatedArgs[0].value !== '')
                  ? evaluatedArgs[0].value
                  : '(?:)'
  const flags = evaluatedArgs.length >= 2
                ? evaluatedArgs[1].value
                : ''

  const xregexp = new XRegExp(pattern, flags)

  return t.regExpLiteral(xregexp.source, xregexp.flags)
}

function maybeReplaceWithRegExpLiteral (path, t) {
  if (!t.isIdentifier(path.node.callee, {name: 'RegExp'})) {
    return
  }
  const regExpLiteral = createRegExpLiteral(path.get('arguments'), t)
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
      }
    }
  }
}
