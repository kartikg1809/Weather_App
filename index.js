import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port=3000;
let apikey="2weW3MUq1GGiHiKkmDWybrJMH9wTdgSw";
let URL="http://dataservice.accuweather.com/locations/v1";
let URL2="https://dataservice.accuweather.com/forecasts/v1"
let weather;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', (req, res) =>{
    res.render('index.ejs');
});

app.get('/oneDay', (req, res) =>{
    res.render('oneDay.ejs',{data:weather});
});
app.post("/onedayforecast", async (req, res) => {
    const searchId = req.body.id;
    try {
        let config={
            params: {
                apikey:apikey,
                q: searchId,
            },
        };
      const result = await axios.get(URL + "/cities/search", config);
      let temp=result.data;
      let key=temp[0].Key;
      let config2={
        params: {
            apikey:apikey,
            details:true,
        },
      }
      console.log(URL + "/daily/1day/"+key, config2);
      const result2 = await axios.get(URL2 + "/daily/1day/"+key, config2);
      console.log(result2.data);
      res.render("oneDay.ejs", { weather: result2.data,city:searchId});
    } catch (error) {
      weather="Something went wrong";
    }
  });

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})