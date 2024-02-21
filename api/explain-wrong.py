from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
# Make sure to adjust the import path for explain_why_wrong based on your project structure
from api.dependencies.dependencies import explain_why_wrong

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query_components = parse_qs(urlparse(self.path).query)
        sentence = query_components.get('sentence', [None])[0]
        word = query_components.get('word', [None])[0]
        
        if sentence and word:
            # Simulate the explanation logic
            explanation = explain_why_wrong(sentence=sentence, word=word)
            
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(explanation.encode())
        else:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write('{"detail": "Missing sentence or word parameter"}'.encode())

# Note: Adjust the import statement and uncomment the actual logic as per your setup
