from flask import Flask, render_template, request
import os, requests, json

app = Flask(__name__)
port = 3000

@app.route("/")
def main():
    return "Hello world"

@app.route("/search", methods=["GET"])
def search():
    if request.method == "GET":
        name = request.args.get("name")
        url = f"https://imdb-movies-web-series-etc-search.p.rapidapi.com/{name}.json"
        
        response = requests.get(url, headers={
            "X-RapidAPI-Key": os.environ["rapidAPIKey"],
	        "X-RapidAPI-Host": os.environ["rapidAPIHost"]
        })
        
        loads = json.loads(response.text)
        
        return render_template("search.html", name=name, result=loads["d"])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port)