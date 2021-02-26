import os
from gevent.pywsgi import WSGIServer
from trackpack import app
from trackpack.routes import routes

#routes
app.add_url_rule('/', view_func=routes.hello_world, methods=['GET'])

#Run
if __name__ == '__main__':
    port= int(os.environ.get("PORT", 5000))
    app.debug = True
    wsgi_app = app.wsgi_app
    http_server = WSGIServer(('', port), wsgi_app)
    http_server.serve_forever()