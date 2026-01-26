import re

# Read the HTML file
with open('/Users/rsdeora/Downloads/web/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the entire gallery-text-container div block
pattern = r'(\s*)<div class="gallery-text-container">.*?</div>\s*'

# Function to replace with commented version
def replace_with_comment(match):
    whitespace = match.group(1)
    # Get the full matched text and comment it out
    text_to_comment = match.group(0).strip()
    return f'{whitespace}<!-- {text_to_comment} -->\n'

# Replace all occurrences
new_content = re.sub(pattern, replace_with_comment, content, flags=re.DOTALL)

# Count replacements
count = len(re.findall(pattern, content, flags=re.DOTALL))

# Write back to file
with open('/Users/rsdeora/Downloads/web/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f'✓ Commented out {count} gallery-text-container divs')
