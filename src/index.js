import XRegExp from "xregexp";

export default function ({ types: t }) {
  return {
    visitor: {
      RegExpLiteral(path) {
        const { node } = path;

        const xregexp = XRegExp(node.pattern, node.flags);
        const { source, flags } = xregexp;

        if (source !== node.pattern || flags !== node.flags) {
          path.replaceWith(t.RegExpLiteral(source, flags));
        }
      }
    }
  };
}
