import urllib.request
import os

images = {
    'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
    'wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400',
    'maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400',
    'mungbean': 'https://images.unsplash.com/photo-1572856711516-4afad1f0bf02?auto=format&fit=crop&q=80&w=400',
    'blackgram': 'https://images.unsplash.com/photo-1585847424191-c1bcbea26880?auto=format&fit=crop&q=80&w=400',
    'lentil': 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=400',
    'pomegranate': 'https://images.unsplash.com/photo-1615486511484-92e172a27dd8?auto=format&fit=crop&q=80&w=400',
    'banana': 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&q=80&w=400',
    'mango': 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400',
    'grapes': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=400',
    'watermelon': 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=400',
    'muskmelon': 'https://images.unsplash.com/photo-1598112973413-1b91316b23b4?auto=format&fit=crop&q=80&w=400',
    'apple': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6caa6?auto=format&fit=crop&q=80&w=400',
    'orange': 'https://images.unsplash.com/photo-1611080626919-7cf5a9db4027?auto=format&fit=crop&q=80&w=400',
    'papaya': 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?auto=format&fit=crop&q=80&w=400',
    'coconut': 'https://images.unsplash.com/photo-1589334861132-44df0e13715e?auto=format&fit=crop&q=80&w=400',
    'cotton': 'https://images.unsplash.com/photo-1585095368412-bd74e0d4a7c8?auto=format&fit=crop&q=80&w=400',
    'jute': 'https://images.unsplash.com/photo-1501250275817-29d93699b08f?auto=format&fit=crop&q=80&w=400',
    'coffee': 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=400',
    'chickpea': 'https://images.unsplash.com/photo-1603513492128-ba7bf6623630?auto=format&fit=crop&q=80&w=400',
    'kidneybeans': 'https://images.unsplash.com/photo-1620888995328-fff887378fc7?auto=format&fit=crop&q=80&w=400',
    'pigeonpeas': 'https://images.unsplash.com/photo-1587049352848-0ca91b3dd679?auto=format&fit=crop&q=80&w=400',
    'mothbeans': 'https://images.unsplash.com/photo-1601614418645-8cafffdeb8d1?auto=format&fit=crop&q=80&w=400',
    'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400',
    'tomato': 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&q=80&w=400'
}

os.makedirs('frontend/src/assets/crops', exist_ok=True)
for crop, url in images.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(f'frontend/src/assets/crops/{crop}.png', 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f'Downloaded {crop}.png')
    except Exception as e:
        print(f'Failed {crop}: {e}')
