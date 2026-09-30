import threading
import time
import requests
from app import create_app
from app.database import connect_to_mongo, close_mongo_connection
from werkzeug.serving import make_server

class ServerThread(threading.Thread):
    def __init__(self, app):
        threading.Thread.__init__(self)
        self.server = make_server('127.0.0.1', 8000, app)
        self.ctx = app.app_context()
        self.ctx.push()

    def run(self):
        self.server.serve_forever()

    def shutdown(self):
        self.server.shutdown()

app = create_app()
connect_to_mongo()
server = ServerThread(app)
server.start()

try:
    time.sleep(5) # give whisper time to load
    
    print("Testing health...")
    r1 = requests.get("http://127.0.0.1:8000/api/v1/health")
    print(r1.status_code, r1.json())
    
    print("Testing upload...")
    files = {'file': ('test_marathi.mp3', open('test_marathi.mp3', 'rb'), 'audio/mpeg')}
    r2 = requests.post("http://127.0.0.1:8000/api/v1/transcription", files=files)
    print(r2.status_code, r2.json())
finally:
    server.shutdown()
    close_mongo_connection()
