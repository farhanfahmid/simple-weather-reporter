const express = require('express');
const bodyParser = require("body-parser")
const { write } = require('fs');
const https = require('https');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    var cityName = req.body.cityName;
    console.log(cityName);


    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&&appid=791aca3eb61986e68819308511308918"

    https.get(url, (response) => {
        //console.log(response);

        response.on("data", (data) => {
            const weather_data = JSON.parse(data)
            console.log(weather_data)

            const temperature = weather_data.main.temp
            console.log("The temperature is " + temperature)

            const feels_like = weather_data.main.feels_like
            console.log("Feels like " + feels_like)

            const desc = weather_data.weather[0].description
            console.log("Description: " + desc)

            const maxTemp = weather_data.main.temp_max

            const minTemp = weather_data.main.temp_min

            const pressure = weather_data.main.pressure

            const humidity = weather_data.main.humidity


            const icon_id = weather_data.weather[0].icon

            const icon_pic = "https://openweathermap.org/img/wn/" + icon_id +"@2x.png"
            
            res.write("<h1>The temperature in "+ cityName +" is " + temperature + " degree Celcius, and feels like " + feels_like + " degree Celcius</h1>")
            res.write("<h2>" + cityName + " currently has " + desc + "</h2>")
            res.write("<img src = " + icon_pic + ">" + "<br>")
            res.write("Max temperature: " + maxTemp + " degree Celcius" + "<br>")
            res.write("Min temperature: " + minTemp + " degree Celcius" + "<br>")
            res.write("Pressure: " + pressure + " hPa" + "<br>")
            res.write("Humidity: " + humidity + "%" + "<br>")
            
            


            res.send();
        })
    })


    //res.send("Server up and running")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})