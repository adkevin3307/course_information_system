from flask import Flask, request, render_template, send_from_directory
app = Flask(__name__, template_folder='.', static_folder='assets')

@app.route('/')
def generic():
    return render_template('generic.html')
@app.route('/app.py')
def app_py():
    return send_from_directory('.', 'app.py')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port='11111')