const express = require("express");
const axios = require("axios");
const path = require("path");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/search", (req, res) => {
    const name = req.query.name;
    const options = {
        method: "GET",
        url: `https://imdb-movies-web-series-etc-search.p.rapidapi.com/${name}.json`,
        headers: {
            "X-RapidAPI-Key": process.env["rapidAPIKey"],
            "X-RapidAPI-Host": process.env["rapidAPIHost"]
        }
    };

    axios.request(options).then((response) => {
        res.render("search", {
            name: name,
            results: response.data["d"]
        });
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err.message);
    });
});

app.listen(port, () => {
    console.log("Express server is listening to " + port);
});