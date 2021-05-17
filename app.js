const { response } = require("express");

const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {

    const query = req.body.cityName;

    const apiKey = "56d203bb49b2ee04a9e61a5333fcbab0";

    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);


        response.on("data", function(data) {

            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;

            //const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            
            const icon = weatherData.weather[0].icon;

            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius</h1>");
        
            res.write("<h3>The weather is currently " + weatherDescription + "</h3>");
        
            res.write("<img src=" + imageURL + ">");

            res.send();

        });

    });

});

app.listen(1303, function() {
    console.log("Server is running on port 1303");
});