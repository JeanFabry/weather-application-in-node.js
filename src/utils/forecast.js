const request = require("request");

const forecast = (lat, lon, callback) => {
    const url = "https://api.weatherbit.io/v2.0/forecast/daily?lat="+lat+"&lon="+lon+"&key=43daf20600d64f8a969464e9e5bdae3b";

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback("Couldn't connect to API, probably internet connection",undefined)
        } else if (body.error) {
            callback(body.error,undefined)
        } else {
            callback(undefined, body.data[1].weather.description + ", and the highest temperature will be: "+ body.data[1].high_temp + " degrees.") 
        }
    })

}

module.exports = forecast;

// const url = "https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&lang=es&key=43daf20600d64f8a969464e9e5bdae3b";
// // const url ="https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/37.8267,-122.4233";

// request({
//     url: url,
//     json: true
// }, (error, response) => {

//     if (error) {
//         console.log("Unable to connect to API");
//     } else if (response.body.error) {
//         console.log(response.body.error);
//     } else {
//         console.log("The forecasts: " + response.body.data[1].weather.description + ". The highest temperature will be " + response.body.data[1].high_temp + " °C.");
//     }
// })