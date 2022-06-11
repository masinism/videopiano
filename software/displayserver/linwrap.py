from os import path
from twisted.web import server, resource
from twisted.internet import reactor, endpoints, defer
from twisted.web.client import Agent, readBody

import os
from twisted.internet import protocol

CACHE_DIR = "/opt/.cache"

class LinthesiaProtocol(protocol.ProcessProtocol):

#    def __init__(self):
#        pass

    def connectionMade(self):
        print("Connection made with linthesia")

    def childDataReceived(self, childFD, data):
        print(data)
        
    def processEnded(self, status):
        print("PROCESS ENDED", str(status))


def is_cached(url):
    return path.exists(os.path.join(CACHE_DIR, url))


def cbRequest(response, mid_file, spawn_d):
    d = readBody(response)
    d.addCallback(cbBody, mid_file, spawn_d)


def cbBody(body, mid_file, spawn_d):
    with open(mid_file, "wb") as f:
        f.write(body)
    spawn_d.callback(mid_file)
    
def fetch_midi(url, mid_file, spawn_d):
    if is_cached(mid_file):
        print("SKIP CACHED")
        spawn_d.callback(mid_file)
        return
    
    agent = Agent(reactor)
    d = agent.request(b'GET', url.encode("utf-8"))
    d.addCallback(cbRequest, mid_file, spawn_d)

class LinthesiaResource(resource.Resource):
    isLeaf = True
    protocol = None

    def spawn(self, mid_file):
        reactor.spawnProcess(self.protocol, "/opt/linthesia/build/src/linthesia",
                             args=['linthesia', '-W', '-s', '-f', mid_file, '--loop-song'],
                             env=os.environ)
        
    def render_GET(self, request):
        content = u"{}"
        action = request.args[b'action'][0].decode("utf-8")

        if action == 'start':
            self.protocol = LinthesiaProtocol()
            midi_url = request.args[b'url'][0].decode("utf-8")
            d = defer.Deferred()
            d.addCallback(self.spawn)            
            fetch_midi(midi_url, os.path.join(CACHE_DIR, os.path.basename(midi_url)), d)
            
        if action == 'stop':
            self.protocol.transport.signalProcess('KILL')
        elif action == 'speedup':
            self.protocol.transport.write(b"speedup\n")
        elif action == 'speeddown':
            self.protocol.transport.write(b"speeddown\n")
            
        return content.encode("ascii")

endpoints.serverFromString(reactor, "tcp:3000").listen(server.Site(LinthesiaResource()))
reactor.run()
