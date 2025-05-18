const express=require('express');
const axios=require('axios');
const app=express();
const API_KEY='9482d07977912e1f23e7946e785b6de5';

app.get('/weather/:city',async(req,res)=>{
  const city=req.params.city;
  try{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response=await axios.get(url);

    const weatherData=response.data;
    res.json({
      city:weatherData.name,
      temp:weatherData.main.temp,
      weather:weatherData.weather[0].description,
      humidity:weatherData.main.humidity,
    });
  }catch(err)
  {
    res.status(500).json({error:'failed to fetch weather data'});
  }
});

const port =4000;
app.listen(port,()=>{
  console.log('server running on http://localhost:4000');
});