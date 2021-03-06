import os
from flask import Flask,render_template, request,json

app = Flask("__name__")


@app.route("/hello")
def hello():
    return "Hello World!"


@app.route('/')
def display():
    return render_template('home.html')

@app.route('/recording/')
def record():
    return render_template('recording.html')

@app.route('/analyze/', methods=['POST'])
def analyze():
	if request.method == 'POST':
		result = request.form['sp_area']
	return json.dumps({'status':'OK','result':result});

if __name__ == '__main__':
	app.run(debug=True)

    