from flask import Flask, render_template, request

app = Flask(__name__)
port = 3000

@app.route("/")
def main():
    return "Hello world"

@app.route("/search", methods=["GET"])
def search():
    if request.method == "GET":
        name = request.args.get("name")
        return render_template("search.html", name=name)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)