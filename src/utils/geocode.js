const request = require("request");

const geocode = (adress, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + adress + ".json?access_token=pk.eyJ1Ijoic2lmYWthIiwiYSI6ImNrbWQ2cHZldDA0ZnEydXBwbHBnd2t0ODMifQ.Kr0v2AVe_fwYZavayykULg&limit=1";

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
           callback("Couldn't connect to API, probably internet connection",undefined)
        } else if (body.features.length == 0) {
            callback("Location not well written, try a new search",undefined)
        } else {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name,
            }) 
        }
    })

}

module.exports = geocode;

// //Geocoding 
// const urlLocalisation = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2lmYWthIiwiYSI6ImNrbWQ2cHZldDA0ZnEydXBwbHBnd2t0ODMifQ.Kr0v2AVe_fwYZavayykULg&limit=1";

// request({
//     url: urlLocalisation,
//     json: true
// }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to API");
//     } else if (response.body.features.length == 0) {
//         console.log("Location not well written");
//     } else {
//         console.log("Longitude: " + response.body.features[0].center[0] + ". Latitude" + response.body.features[0].center[1]);
//     }
// })