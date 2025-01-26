class MarkdownProcessor {
    constructor(options = {}) {
        this.options = {
            breaks: true,
            highlight: null,
            ...options
        };
    }

    compile(markdown) {
        // Basic Markdown to HTML conversion
        return this.parseMarkdown(markdown);
    }

    parseMarkdown(text) {
        return text.replace(/(?:^|\n)([^\n]+)/g, (line) => {
            switch (true) {
                case /^\s*$/.test(line):
                    // Empty line or just whitespace
                    return '<br>';
                case /^#{1,6}\s/.test(line):
                    // Headings
                    const headingLevel = line.match(/^(#{1,6})/)[0].length;
                    return `<h${headingLevel}>${line.replace(/^#{1,6}\s/, '')}</h${headingLevel}>`;

                case /\*\*.*\*\*/.test(line):
                    // Bold
                    return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                case /\*.*\*/.test(line):
                    // Italic
                    return line.replace(/\*(.*?)\*/g, '<em>$1</em>');

                case /!\[.*\]\(.*\)/.test(line):
                    // Images
                    return line.replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');

                case /\[.*\]\(.*\)/.test(line):
                    // Links
                    return line.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');

                case /^-\s/.test(line):
                    // Unordered List
                    return line.replace(/^-\s(.*)/, '<li>$1</li>');

                case /^\d+\.\s/.test(line):
                    // Ordered List
                    return line.replace(/^\d+\.\s(.*)/, '<li>$1</li>');

                case /`.*`/.test(line):
                    // Inline Code
                    return line.replace(/`(.*?)`/g, '<code id="inlineCode">$1</code>');
                default:
                    // Paragraph or unchanged line
                    return line.trim() ? `<p>${line}</p>` : line;
            }
        });
    }
}

export { MarkdownProcessor };