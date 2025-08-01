export function formatMessageContent(content: string) {
  // Remove markdown symbols and format text properly
  let formatted = content
    // Remove markdown headers
    .replace(/#{1,6}\s+/g, '')
    // Remove bold/italic markers but keep content
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Clean up list markers
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^\s*\d+\.\s+/gm, (match, offset, string) => {
      const lineStart = string.lastIndexOf('\n', offset) + 1;
      const linePrefix = string.substring(lineStart, offset);
      const number = linePrefix.match(/\d+/) ? parseInt(linePrefix.match(/\d+/)![0]) : 1;
      return `${number}. `;
    });

  return formatted;
}

export function extractCodeBlocks(content: string) {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      const textContent = content.slice(lastIndex, match.index);
      if (textContent.trim()) {
        parts.push({
          type: 'text',
          content: formatMessageContent(textContent),
        });
      }
    }

    // Add code block
    parts.push({
      type: 'code',
      language: match[1] || 'text',
      content: match[2].trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const textContent = content.slice(lastIndex);
    if (textContent.trim()) {
      parts.push({
        type: 'text',
        content: formatMessageContent(textContent),
      });
    }
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: formatMessageContent(content) }];
}