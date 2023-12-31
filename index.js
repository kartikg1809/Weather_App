import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port=3000;
let apikey="ONzfMcqyrt1vUZ8BI1ipgM1Bxkpwr8Eb";
let URL="http://dataservice.accuweather.com/locations/v1";
let URL2="https://dataservice.accuweather.com/currentconditions/v1/"
let weather;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/', async (req, res) =>{
    try{
        let config={
            params: {
                apikey:apikey,
            },
          }
        const result = await axios.get("http://dataservice.accuweather.com/currentconditions/v1/topcities/50",config);
        console.log(result);
        res.render('index.ejs',{content:result.data});
    }catch(e){

    }
});

app.get('/oneDay', (req, res) =>{
    res.render('oneDay.ejs',{data:weather});
});
app.get('/current', (req, res) =>{
    res.render('current.ejs',{data:weather});
});
app.post("/currentforecast", async (req, res) => {
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
      const result2 = await axios.get(URL2 +key, config2);
      console.log(result2.data);
      res.render("current.ejs", { weather: result2.data,city:searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()});
    } catch (error) {
      weather="Something went wrong";
    }
  });

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})