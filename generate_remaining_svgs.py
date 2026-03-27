import os

cropIconsDir = 'frontend/src/assets/cropIcons'
os.makedirs(cropIconsDir, exist_ok=True)

apple_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M50 80 C 80 80, 85 40, 65 25 C 55 20, 50 30, 50 30 C 50 30, 45 20, 35 25 C 15 40, 20 80, 50 80 Z" fill="#fca5a5" stroke="#ef4444" stroke-width="4" stroke-linejoin="round"/>
    <path d="M50 30 Q45 15 60 10" stroke="#16a34a" stroke-width="5" stroke-linecap="round" fill="none"/>
</svg>'''

blackgram_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <circle cx="40" cy="45" r="10" fill="#374151" stroke="#1f2937" stroke-width="3"/>
    <circle cx="60" cy="55" r="10" fill="#374151" stroke="#1f2937" stroke-width="3"/>
    <circle cx="50" cy="65" r="10" fill="#374151" stroke="#1f2937" stroke-width="3"/>
</svg>'''

chickpea_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <ellipse cx="45" cy="50" rx="15" ry="12" fill="#fdf6e3" stroke="#eab308" stroke-width="3"/>
    <ellipse cx="55" cy="60" rx="15" ry="12" fill="#fdf6e3" stroke="#eab308" stroke-width="3"/>
    <path d="M35 55 L32 60 M45 65 L42 70" stroke="#ca8a04" stroke-width="3" stroke-linecap="round"/>
</svg>'''

coconut_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <circle cx="50" cy="55" r="30" fill="#a16207" stroke="#713f12" stroke-width="4"/>
    <circle cx="40" cy="45" r="4" fill="#713f12"/><circle cx="60" cy="45" r="4" fill="#713f12"/><circle cx="50" cy="60" r="4" fill="#713f12"/>
</svg>'''

coffee_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <ellipse cx="50" cy="50" rx="15" ry="25" fill="#78350f" stroke="#451a03" stroke-width="4" transform="rotate(20 50 50)"/>
    <path d="M48 30 Q58 50 45 70" stroke="#451a03" stroke-width="3" fill="none" transform="rotate(20 50 50)"/>
</svg>'''

grapes_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M50 20 L50 40" stroke="#16a34a" stroke-width="4"/>
    <circle cx="40" cy="40" r="10" fill="#a855f7" stroke="#7e22ce" stroke-width="2"/>
    <circle cx="60" cy="40" r="10" fill="#a855f7" stroke="#7e22ce" stroke-width="2"/>
    <circle cx="30" cy="55" r="10" fill="#a855f7" stroke="#7e22ce" stroke-width="2"/>
    <circle cx="50" cy="55" r="10" fill="#c084fc" stroke="#7e22ce" stroke-width="2"/>
    <circle cx="70" cy="55" r="10" fill="#a855f7" stroke="#7e22ce" stroke-width="2"/>
    <circle cx="40" cy="70" r="10" fill="#a855f7" stroke="#7e22ce" stroke-width="2"/>
    <circle cx="60" cy="70" r="10" fill="#a855f7" stroke="#7e22ce" stroke-width="2"/>
    <circle cx="50" cy="85" r="10" fill="#c084fc" stroke="#7e22ce" stroke-width="2"/>
</svg>'''

jute_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M50 90 V20" stroke="#16a34a" stroke-width="6" stroke-linecap="round"/>
    <path d="M50 40 Q70 30 80 40 Q70 50 50 40" fill="#86efac" stroke="#22c55e" stroke-width="2"/>
    <path d="M50 60 Q30 50 20 60 Q30 70 50 60" fill="#86efac" stroke="#22c55e" stroke-width="2"/>
</svg>'''

kidneybeans_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M30 60 C 20 30, 60 20, 70 40 C 80 60, 50 90, 40 70 Q 50 50 30 60 Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="4" stroke-linejoin="round"/>
</svg>'''

lentil_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <circle cx="40" cy="45" r="12" fill="#f97316" stroke="#c2410c" stroke-width="3"/>
    <circle cx="60" cy="55" r="12" fill="#f97316" stroke="#c2410c" stroke-width="3"/>
    <circle cx="50" cy="65" r="12" fill="#f97316" stroke="#c2410c" stroke-width="3"/>
</svg>'''

mothbeans_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <ellipse cx="40" cy="45" rx="12" ry="8" fill="#d97706" stroke="#92400e" stroke-width="3"/>
    <ellipse cx="60" cy="55" rx="12" ry="8" fill="#d97706" stroke="#92400e" stroke-width="3"/>
    <ellipse cx="50" cy="65" rx="12" ry="8" fill="#d97706" stroke="#92400e" stroke-width="3"/>
</svg>'''

mungbean_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <ellipse cx="40" cy="45" rx="10" ry="14" fill="#a3e635" stroke="#4d7c0f" stroke-width="3"/>
    <ellipse cx="60" cy="55" rx="10" ry="14" fill="#a3e635" stroke="#4d7c0f" stroke-width="3"/>
    <ellipse cx="50" cy="65" rx="10" ry="14" fill="#a3e635" stroke="#4d7c0f" stroke-width="3"/>
</svg>'''

muskmelon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <circle cx="50" cy="55" r="30" fill="#fcd34d" stroke="#eab308" stroke-width="4"/>
    <path d="M30 40 Q50 60 70 40 M30 55 Q50 75 70 55 M30 70 Q50 90 70 70" stroke="#fde047" stroke-width="3" fill="none"/>
</svg>'''

orange_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <circle cx="50" cy="55" r="28" fill="#fb923c" stroke="#ea580c" stroke-width="4"/>
    <circle cx="45" cy="45" r="2" fill="#ea580c"/><circle cx="55" cy="50" r="2" fill="#ea580c"/>
    <path d="M50 27 Q60 15 70 25" fill="#86efac" stroke="#22c55e" stroke-width="2"/>
</svg>'''

papaya_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <ellipse cx="50" cy="55" rx="20" ry="32" fill="#f59e0b" stroke="#d97706" stroke-width="4"/>
    <ellipse cx="50" cy="55" rx="8" ry="15" fill="#fcd34d"/>
    <circle cx="50" cy="55" r="1.5" fill="#000"/><circle cx="48" cy="48" r="1.5" fill="#000"/><circle cx="52" cy="62" r="1.5" fill="#000"/>
</svg>'''

pigeonpeas_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <path d="M30 50 Q50 20 70 50 Q50 80 30 50" fill="#bef264" stroke="#65a30d" stroke-width="3"/>
    <circle cx="40" cy="50" r="6" fill="#a3e635"/>
    <circle cx="50" cy="50" r="6" fill="#a3e635"/>
    <circle cx="60" cy="50" r="6" fill="#a3e635"/>
</svg>'''

pomegranate_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <circle cx="50" cy="55" r="28" fill="#ef4444" stroke="#b91c1c" stroke-width="4"/>
    <path d="M40 27 L45 15 L50 27 L55 15 L60 27" fill="#ef4444" stroke="#b91c1c" stroke-width="3" stroke-linejoin="round"/>
</svg>'''

watermelon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="#e8f5e9" />
    <ellipse cx="50" cy="55" rx="35" ry="25" fill="#22c55e" stroke="#166534" stroke-width="4"/>
    <path d="M30 45 C 40 60, 60 60, 70 45" stroke="#15803d" stroke-width="4" fill="none"/>
    <path d="M25 55 C 40 70, 60 70, 75 55" stroke="#15803d" stroke-width="4" fill="none"/>
</svg>'''

icons = {
    'Apple.svg': apple_svg,
    'Blackgram.svg': blackgram_svg,
    'Chickpea.svg': chickpea_svg,
    'Coconut.svg': coconut_svg,
    'Coffee.svg': coffee_svg,
    'Grapes.svg': grapes_svg,
    'Jute.svg': jute_svg,
    'Kidneybeans.svg': kidneybeans_svg,
    'Lentil.svg': lentil_svg,
    'Mothbeans.svg': mothbeans_svg,
    'Mungbean.svg': mungbean_svg,
    'Muskmelon.svg': muskmelon_svg,
    'Orange.svg': orange_svg,
    'Papaya.svg': papaya_svg,
    'Pigeonpeas.svg': pigeonpeas_svg,
    'Pomegranate.svg': pomegranate_svg,
    'Watermelon.svg': watermelon_svg
}

for name, content in icons.items():
    with open(f'{cropIconsDir}/{name}', 'w') as f:
        f.write(content)

print("Generated Remaining SVGs successfully.")
