from gevent.pywsgi import WSGIServer
from api.routes import routes
from api import app
import os

if __name__ == '__main__':
    port= int(os.environ.get("PORT", 5000))
    app.debug = True
    wsgi_app = app.wsgi_app
    http_server = WSGIServer(('', port), wsgi_app)
    http_server.serve_forever()