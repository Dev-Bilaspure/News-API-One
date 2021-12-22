const axios = require('axios');
const express = require('express');
const categories = require('./utils/categories');
const dotenv = require('dotenv');
const makeURL = require('./utils/makeURL');

const app = express();
app.use(express.json())
dotenv.config();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const API_KEY = process.env.API_KEY;

const newsSuperSet = {
    allNewsSets: []
};

const fetchAllNews = () => {
    console.log('waiting-1');
    categories.map(async(cat) => {
        console.log('waiting-2');
        const URL =`https://newsdata.io/api/1/news?apikey=${API_KEY}&country=au,ca,in,gb,us&language=en,hi&category=${cat}`
        try {
            const news = await axios.get(
                URL, { nextPage: 1 } 
            )
            .then(newsData => {
                newsSuperSet.allNewsSets.push(newsData.data.results);
                console.log(newsData.data.results);
            })
            .catch(err => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    })
}
app.get('/api/allnews',(req, res) => {
    if(newsSuperSet.allNewsSets.length == 0)
        fetchAllNews();
    res.json(newsSuperSet);
})

app.post('/api/filterednews', async(req, res) => {
    const URL = makeURL(req.body);
    try {
        const news = await axios.get(
            URL
        )
        .then(newsData => {
            res.json(newsData.data)
        })
        .catch(err => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
})