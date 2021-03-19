const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const viewsPath = path.join(__dirname, "../templates/views")
const publicDirectoryPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: "Jean Fabry"
    })
})

app.get('/helping', (req, res) => {
    res.render('helping', {
        title: "Help page",
        name: "Express.js"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: ['Please provide an address to get results']
        })
    }
    
    geocode(req.query.address, (error, {
       latitude,
        longitude,
        location} = {}) => {
        if (error) {return res.send({error});
        }
        else {forecast(latitude, longitude, (error, forecastData) => {
            if (error) {return res.send({error});
            }
            res.send({
                location,
                address: req.query.address,
                forecast: forecastData,
            })
        })}
    })
})

app.get("/product", (req, res) => {
    if (!req.query.search) {
        return res.send({
            product: ['Please do a search to get results']
        })
    }
    res.send({
        products: ["coucou"]
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Help page",
        text: "This help article does not exist",
        name: "Jean Fabry"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 page",
        name: "jeannot3"
    })
})

app.listen(port, () => {
    console.log("server is up on port"+port);
})

//  console.log(__dirname);
// console.log(__filename);

// app.get('/help', (req,res)=>{
//     res.send([{
//         name: "jean",
//         code:"coucou"
//     },{}])
// })

// app.get('/about', (req,res)=>{
//     res.send('<h1>about page!</h1>')
// })