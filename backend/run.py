from app import create_app
from app.database import connect_to_mongo, close_mongo_connection
import atexit

app = create_app()
connect_to_mongo()
atexit.register(close_mongo_connection)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
