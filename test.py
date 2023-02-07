import requests, os, json

name = "conjuring"
url = f"https://imdb-movies-web-series-etc-search.p.rapidapi.com/{name}.json"
response = requests.get(url, headers={
    "X-RapidAPI-Key": os.environ["rapidAPIKey"],
    "X-RapidAPI-Host": os.environ["rapidAPIHost"]
})
loads = json.loads(response.text)

print(loads["d"])