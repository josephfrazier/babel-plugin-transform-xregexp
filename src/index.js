import XRegExp from "xregexp";

export default function ({ types: t }) {
  return {
    visitor: {
      RegExpLiteral(path) {
        const { node } = path;

        const xregexp = XRegExp(node.pattern, node.flags);
        const { source, flags } = xregexp;

        path.replaceWith(t.newExpression(t.identifier("RegExp"), [
          t.stringLiteral(source),
          t.stringLiteral(flags)
        ]));
      }
    }
  };
}
