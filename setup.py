from flask import Flask
app = Flask(__name__)

import voisai.views

if __name__ == '__main__':
	app.run(debug=True)
