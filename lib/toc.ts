import { v4 as uuidv4 } from 'uuid';
export const extractHeadings = (doc: any): { text: string; level: number; id: string }[] => {
  const headings: { text: string; level: number; id: string }[] = [];

  const traverse = (node: any) => {
    // Check if the node is a heading (levels 1-6)
    if (node.type === 'heading' && [1, 2, 3, 4, 5, 6].includes(node.attrs?.level)) {
      const headingText = node.content?.[0]?.text || ''; // Get the text content of the heading

      // Log node attributes to ensure `id` is being set
      console.log('Node:', node); // Check the full node to inspect the attributes

      // Push the heading details if text is available
      if (headingText.trim() !== '') {
        headings.push({
          text: headingText,
          level: node.attrs.level,
          id: node.attrs.id || uuidv4(), // Generate a UUID if the `id` is not set
        });
      }
    }

    // Recursively check child nodes
    if (node.content) {
      node.content.forEach(traverse);
    }
  };

  traverse(doc);

  return headings;
};
