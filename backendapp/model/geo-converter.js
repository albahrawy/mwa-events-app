const config = require('../api-config.json');
const superagent = require('superagent');

//https://developer.here.com/

const convertAddress = (searchtext) => {
    return new Promise((res) => {
        superagent.get(`https://geocoder.ls.hereapi.com/search/6.2/geocode.json?languages=en-US&maxresults=1`)
            .query({ 'apiKey': config.geo_here_key })
            .query({ searchtext })
            .then(response => {
                const results = JSON.parse(response.text)?.Response?.View?.[0]?.Result?.[0]?.Location?.NavigationPosition?.[0];
                res({ long: results?.Longitude, lat: results?.Latitude });
            });
    })
}

module.exports = convertAddress;
