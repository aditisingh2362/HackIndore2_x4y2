import requests

url = 'http://localhost:5000/predict_api'
r = requests.post(url,json={'District Name':'Mainpuri', 'Market Name':'Mainpuri', 'Month':7})

print(r.json())
