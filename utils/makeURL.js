const dotenv = require('dotenv');

dotenv.config();
const API_KEY = process.env.API_KEY;

const makeURL = (obj) => {
    let query = '';
    if(obj.query) {
        let arr = obj.query.split(' ');
        let arrSize = arr.length;
        for(let i=0;i<arrSize;i++) {
            query+=arr[i];
            if(i!==arrSize-1)
                query+='%20';
        }
    }
    

    let categories = '';
    if(obj.categories.length) {
        for(let i=0;i<obj.categories.length;i++) {
            categories+=obj.categories[i];
            if(i!==obj.categories.length-1)
                categories+=',';
        }
    }

    
    let languages = 'hi,en';
    if(obj.languages.length) {
        for(let i=0;i<obj.languages.length;i++) {
            if(obj.languages[i]!=='hi' && obj.languages[i]!=='en') {
                languages+=',';
                languages+=obj.languages[i];
            }
        }
    }
    

    let countries = '';
    if(obj.countries.length) {
        for(let i=0;i<obj.countries.length;i++) {
            countries+=obj.countries[i];
            if(i!==obj.countries.length-1)
                countries+=',';
        }
    }
    
        
    let URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}`;//&q=${query}&country=${countries}&language=${languages}&category=${categories}`
    if(query)
        URL+=`&q=${query}`;
    if(countries)
        URL+=`&country=${countries}`;
    if(languages)
        URL+=`&language=${languages}`;
    if(categories)
        URL+=`&category=${categories}`;
    console.log(URL);

    return(URL);
}

module.exports = makeURL;