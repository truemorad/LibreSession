class MarkdownProcessor {
    compile(markdown) {
        // First, split content by line breaks and process lists
        let content = this.preprocessLists(markdown);
        
        // Then convert the processed content
        return this.parseMarkdown(content);
    }

    preprocessLists(text) {
        const lines = text.split('\n');
        let inOrderedList = false;
        let inUnorderedList = false;
        let processedLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const isOrderedListItem = /^\d+\.\s/.test(line);
            const isUnorderedListItem = /^-\s/.test(line);

            // Handle ordered lists
            if (isOrderedListItem) {
                if (!inOrderedList) {
                    processedLines.push('<ol>');
                    inOrderedList = true;
                }
                processedLines.push(line);
            }
            // Handle unordered lists
            else if (isUnorderedListItem) {
                if (!inUnorderedList) {
                    processedLines.push('<ul>');
                    inUnorderedList = true;
                }
                processedLines.push(line);
            }
            // Close lists if we're no longer in a list
            else {
                if (inOrderedList) {
                    processedLines.push('</ol>');
                    inOrderedList = false;
                }
                if (inUnorderedList) {
                    processedLines.push('</ul>');
                    inUnorderedList = false;
                }
                processedLines.push(line);
            }
        }

        // Close any remaining open lists
        if (inOrderedList) processedLines.push('</ol>');
        if (inUnorderedList) processedLines.push('</ul>');

        return processedLines.join('\n');
    }

    parseMarkdown(text) {
        // Process code blocks first
        text = this.processCodeBlocks(text);
        
        // Then process the rest of the markdown
        return text.replace(/(?:^|\n)([^\n]+)/g, (match, line) => {
            // Skip processing if it's already an HTML tag
            if (line.trim().startsWith('<') && line.trim().endsWith('>')) {
                return '\n' + line;
            }

            // Process other markdown elements
            let processed = line;
            
            // Headings
            if (/^#{1,6}\s/.test(processed)) {
                const level = processed.match(/^(#{1,6})/)[0].length;
                processed = `<h${level}>${processed.replace(/^#{1,6}\s/, '')}</h${level}>`;
            }
            // Bold (process before italic since it uses more asterisks)
            else if (/\*\*.*\*\*/.test(processed)) {
                processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            }
            // Italic
            else if (/\*.*\*/.test(processed)) {
                processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
            }
            // Images (process before links since they're more specific)
            else if (/!\[.*\]\(.*\)/.test(processed)) {
                processed = processed.replace(/!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1">');
            }
            // Links
            else if (/\[.*\]\(.*\)/.test(processed)) {
                processed = processed.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
            }
            // List items (already wrapped in ul/ol from preprocessLists)
            else if (/^-\s/.test(processed)) {
                processed = processed.replace(/^-\s(.*)/, '<li>$1</li>');
            }
            else if (/^\d+\.\s/.test(processed)) {
                processed = processed.replace(/^\d+\.\s(.*)/, '<li>$1</li>');
            }
            // Inline code
            else if (/`.*`/.test(processed)) {
                processed = processed.replace(/`(.*?)`/g, '<code>$1</code>');
            }
            // Paragraphs (only if line isn't empty and isn't already processed)
            else if (processed.trim() && !processed.trim().startsWith('<')) {
                processed = `<p>${processed}</p>`;
            }

            return '\n' + processed;
        }).trim();
    }

    processCodeBlocks(text) {
        // Handle code blocks with triple backticks
        return text.replace(/```([\s\S]*?)```/g, (match, code) => {
            return `<pre><code>${code.trim()}</code></pre>`;
        });
    }
}

export { MarkdownProcessor };