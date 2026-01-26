#!/usr/bin/env python3
import re

# Read the HTML file
with open('index.html', 'r') as f:
    html = f.read()

# Pattern to find current gallery card structure
pattern = r'''<div role="group" aria-roledescription="slide" class="gallery-item-wrapper">\s*<div class="gallery-card">\s*<img src="images/([^"]+)" alt="([^"]+)" class="gallery-image">\s*<div class="gallery-overlay-base"></div>\s*<div class="gallery-overlay-hover"></div>\s*<div class="gallery-text-container">\s*<h3 class="gallery-title">([^<]+)</h3>\s*<p class="gallery-subtitle">([^<]+)</p>\s*</div>\s*</div>\s*</div>'''

def replacer(match):
    img_src = match.group(1)
    img_alt = match.group(2)
    title = match.group(3)
    subtitle = match.group(4)
    
    return f'''<div role="group" aria-roledescription="slide" class="gallery-item-wrapper">
                                    <div class="gallery-card">
                                        <div class="gallery-image-container">
                                            <img src="images/{img_src}" alt="{img_alt}" class="gallery-image">
                                        </div>
                                        <div class="gallery-text-container">
                                            <div>
                                                <h3 class="gallery-title">{title}</h3>
                                                <p class="gallery-subtitle">{subtitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>'''

# Count replacements before
count_before = len(re.findall(pattern, html, flags=re.MULTILINE | re.DOTALL))

# Replace all cards
html_new = re.sub(pattern, replacer, html, flags=re.MULTILINE | re.DOTALL)

# Write back
with open('index.html', 'w') as f:
    f.write(html_new)

print(f"✓ Updated {count_before} gallery cards to new landscape card design")
