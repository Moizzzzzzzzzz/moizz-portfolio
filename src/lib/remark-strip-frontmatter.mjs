/**
 * Remark plugin that strips YAML frontmatter from MDX before rendering.
 *
 * Without remark-frontmatter installed, @next/mdx treats the opening ---
 * as a thematic break and the YAML lines as plain paragraphs. This plugin
 * removes those nodes so they do not appear in the rendered page.
 */
export default function remarkStripFrontmatter() {
  return function (tree) {
    if (tree.children[0]?.type === "thematicBreak") {
      const closeIdx = tree.children.findIndex(
        (n, i) => i > 0 && n.type === "thematicBreak"
      );
      if (closeIdx > 0) {
        tree.children.splice(0, closeIdx + 1);
      }
    }
  };
}
