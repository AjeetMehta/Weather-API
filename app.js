const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
//const ejs=require("ejs");

var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res) {
  const query=req.body.cityName;
  const apiKey="d8f0948244086a8a354e0a516919fcac";

  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
  https.get(url,function(response){

    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const tempe=weatherData.main.temp;
      //console.log(weatherData);
      const weather_description=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const urlImage="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      // res.write("<p>The weather is currently"+weather_description+" </p>");
      // res.write("<h1>Temperature of "+ query + tempe+" degreecelcius</h1>");
      // res.write("<img src="+urlImage+">");
      res.render("monsoon.ejs",{weather_info:weather_description,weather_image:urlImage,weather_temp:tempe,weather_city:query});
    });
   });
});


app.listen(process.env.PORT||3000,function(){
  console.log("Server is running");
});
