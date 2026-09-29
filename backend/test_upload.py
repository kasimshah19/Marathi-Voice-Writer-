import requests

url = "http://127.0.0.1:8000/api/v1/transcription"
files = {'file': ('test_marathi.mp3', open('test_marathi.mp3', 'rb'), 'audio/mpeg')}
response = requests.post(url, files=files)

print("Status Code:", response.status_code)
print("Response JSON:", response.json())
