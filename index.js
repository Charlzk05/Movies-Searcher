const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
const port = 3000;  

app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    try {
        fs.readFile(path.join(__dirname, "Top Movies Data", "data.json"), { encoding: "utf-8" }, (err, data) => {
            if (err) {
                return console.log(err.message);
            }
            res.render("main", {
                results: JSON.parse(data)
            });
        });
    } catch (err) {
        res.sendStatus(500);
        console.log(err.message);
    }
});

app.get("/topmovies", (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://imdb-top-100-movies.p.rapidapi.com/',
            headers: {
              'X-RapidAPI-Key': 'effed8c978mshc5c36ee79f41be1p1b13edjsnbd6c5b3fb54f',
              'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
            }
        };

        axios.request(options).then((response) => {
            fs.writeFile(path.join(__dirname, "topMoviesData", "data.json"), JSON.stringify(response.data, null, 4), { encoding: "utf-8" }, (err) => {
                if (err) {
                    console.log(err.message);
                }
                res.redirect("/");
                console.log("Top Movies Data has been refreshed");
            });
        }).catch((error) => {
            res.sendStatus(500);
            console.log(error);
        });
    } catch (err) {
        res.sendStatus(500);
        console.log(err.message);
    }
});

app.get("/search", (req, res) => {
    try {
        const name = req.query.name;
        const options = {
            method: "GET",
            url: `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${name}.json`,
            headers: {
                "X-RapidAPI-Key": process.env["rapidAPIKey"],
                "X-RapidAPI-Host": process.env["rapidAPIHost"]
            }
        };

        fs.readdir(path.join(__dirname, "Search Data"), (err, data) => {
            if (err) {
                return console.log(err.message);
            }
            if (data.length == 0) {
                axios.request(options).then((response) => {
                    res.render("search", {
                        name: name,
                        results: response.data["d"]
                    });
                    fs.writeFile(path.join(__dirname, "Search Data", `${name}.json`.toLowerCase()), JSON.stringify(response.data["d"], null, 4), { encoding: "utf-8" }, (err) => {
                        if (err) {
                            return console.log(err.message);
                        }
                    });
                    console.log("New Movies Data has been Created!");
                }).catch((error) => {
                    res.sendStatus(500);
                    console.log(error.message);
                });
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i] == `${name}.json`.toLowerCase()) {
                        fs.readFile(path.join(__dirname, "Search Data", `${name}.json`.toLowerCase()), { encoding: "utf-8" }, (err, data) => {
                            if (err) {
                                return console.log(err.message);
                            }
                            res.render("search", {
                                name: name,
                                results: JSON.parse(data)
                            });
                        });
                        break;
                    } else {
                        axios.request(options).then((response) => {
                            res.render("search", {
                                name: name,
                                results: response.data["d"]
                            });
                            fs.writeFile(path.join(__dirname, "Search Data", `${name}.json`.toLowerCase()), JSON.stringify(response.data["d"], null, 4), { encoding: "utf-8" }, (err) => {
                                if (err) {
                                    return console.log(err.message);
                                }
                            });
                            console.log("New Movies Data has been Created!");
                        }).catch((error) => {
                            res.sendStatus(500);
                            console.log(error.message);
                        });
                        break;
                    }
                }
            }
        });
    } catch (err) {
        res.sendStatus(500);
        console.log(err.message);
    }
});

app.listen(port, () => {
    console.log("Express server is listening to " + port);
});