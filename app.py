import http.server
import socketserver
import os

# Définissez le port sur lequel le serveur va écouter
PORT = 8000

# Définissez le répertoire racine du site web (où se trouve index.html)
# Cela suppose que votre script Python est dans le même dossier que index.html
WEB_DIR = os.path.join(os.path.dirname(__file__))

# Changez le répertoire de travail actuel pour qu'il pointe vers WEB_DIR
os.chdir(WEB_DIR)

# Configurez le gestionnaire de requêtes HTTP
Handler = http.server.SimpleHTTPRequestHandler

# Créez le serveur HTTP
# socketserver.TCPServer((adresse, port), Handler)
# L'adresse vide '' signifie que le serveur écoutera sur toutes les interfaces disponibles
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Serveur démarré sur le port {PORT}")
print(f"Accédez à votre site web à l'adresse : http://localhost:{PORT}")
print(f"Appuyez sur Ctrl+C pour arrêter le serveur.")

# Démarrez le serveur et maintenez-le en exécution jusqu'à une interruption (Ctrl+C)
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServeur arrêté.")
    httpd.shutdown()
    httpd.server_close()