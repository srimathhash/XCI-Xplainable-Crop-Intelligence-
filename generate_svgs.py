import os

cropIconsDir = 'frontend/src/assets/cropIcons'
os.makedirs(cropIconsDir, exist_ok=True)

# A minimal flat green-themed plant/leaf base we can tweak for each crop
# Base size 100x100
default_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M50 80 V40 M50 40 Q30 20 50 10 Q70 20 50 40" stroke="#4CAF50" stroke-width="6" fill="#86efac" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''

mango_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M50 75 C 90 75, 80 25, 50 25 C 20 25, 10 75, 50 75 Z" fill="#fcd34d" stroke="#f59e0b" stroke-width="4" stroke-linejoin="round"/>
    <path d="M50 25 Q40 10 60 10" stroke="#4CAF50" stroke-width="5" stroke-linecap="round" fill="none"/>
</svg>'''

rice_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M50 85 V20" stroke="#16a34a" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 30 Q35 40 50 50 M50 50 Q65 60 50 70 M50 20 Q60 30 50 40" stroke="#fde047" stroke-width="6" stroke-linecap="round" fill="none"/>
</svg>'''

maize_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M40 80 Q50 10 60 80 Z" fill="#fef08a" stroke="#eab308" stroke-width="4"/>
    <path d="M30 80 Q40 30 50 80 M70 80 Q60 30 50 80" fill="#86efac" stroke="#4ade80" stroke-width="3"/>
</svg>'''

tomato_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <circle cx="50" cy="55" r="25" fill="#fca5a5" stroke="#ef4444" stroke-width="4"/>
    <path d="M50 30 L45 35 M50 30 L55 35 M50 30 L50 20" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
</svg>'''

potato_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <ellipse cx="50" cy="55" rx="30" ry="20" fill="#fde68a" stroke="#d97706" stroke-width="4"/>
    <circle cx="40" cy="50" r="2" fill="#d97706"/><circle cx="60" cy="55" r="2" fill="#d97706"/><circle cx="50" cy="65" r="2" fill="#d97706"/>
</svg>'''

wheat_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M30 80 C 50 40, 70 80, 50 20" stroke="#facc15" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M40 30 L50 40 M60 50 L50 60 L40 50 L50 40" stroke="#eab308" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>'''

banana_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M30 70 C 80 90, 80 30, 70 30 C 60 50, 40 60, 30 70 Z" fill="#fef08a" stroke="#eab308" stroke-width="4" stroke-linejoin="round"/>
</svg>'''

cotton_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M50 80 V60" stroke="#8b5cf6" stroke-width="4" stroke-linecap="round"/>
    <circle cx="40" cy="45" r="15" fill="#ffffff" stroke="#e5e7eb" stroke-width="3"/>
    <circle cx="60" cy="45" r="15" fill="#ffffff" stroke="#e5e7eb" stroke-width="3"/>
    <circle cx="50" cy="35" r="15" fill="#ffffff" stroke="#e5e7eb" stroke-width="3"/>
</svg>'''

icons = {
    'DefaultPlant.svg': default_svg,
    'Mango.svg': mango_svg,
    'Rice.svg': rice_svg,
    'Maize.svg': maize_svg,
    'Tomato.svg': tomato_svg,
    'Potato.svg': potato_svg,
    'Wheat.svg': wheat_svg,
    'Banana.svg': banana_svg,
    'Cotton.svg': cotton_svg
}

for name, content in icons.items():
    with open(f'{cropIconsDir}/{name}', 'w') as f:
        f.write(content)

print("Generated SVGs successfully.")
