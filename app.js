const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {

res.sendfile(__dirname+"/index.html");

})
app.post("/",function(req,res){
  const query = req.body.CityName ;
  const apikey ="197696401486eec9ce02c571bb4a39af";
  const unit ="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+unit;

    https.get(url, function(response) {

    console.log(response.statusCode);

    response.on("data", function(data) {

    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp;
    const weatherDescription=weatherData.weather[0].description;
    const icon =weatherData.weather[0].icon;
    const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

        res.write("<h1>The temparetaure in "+query+" is " + temp + " degress celcius</h1>")
        res.write("<img src = "+imageUrl+">")
        res.write("<p>The weather is currently "+ weatherDescription + "</p>")
        res.send()
      })
    })


})



app.listen(3000, function() {
  console.log("server started running ");
});
