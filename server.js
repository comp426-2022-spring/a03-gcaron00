const { coinFlip, coinFlips, countFlips, flipACoin } = require('./modules/coin.js');
// import minimist from "minimist"
// import express from "express"

const express = require("express")
const app = express()

const args = require("minimist")(process.argv.slice(2))  //require("minimist")(

const port = args.port || 5555

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

app.get('/app/flip', (req, res) => {
    res.status(200).json({"flip": coinFlip()})
})

app.get('/app/flips/:number', (req, res) => {
    const result = coinFlips(parseInt(req.params.number))
    const count = countFlips(result)
    res.status(200).json({"raw": result, "summary": count})
})

app.get('/app/flip/call/:call', (req, res) => {
    res.status(200).json(flipACoin(req.params.call))
})

app.get('/app', (req, res) => {
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.use(function(req, res) {
    res.status(404).send("404 NOT FOUND")
    res.type("text/plain")
})