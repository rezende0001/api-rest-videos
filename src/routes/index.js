const express = require('express');
const config = require('../config/config');
const videos = require('./videosRoutes');

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send(`Acesso os videos utilizando https://localhost:${config.port}/videos`)
    })

    app.use(
        express.json(),
        videos
    )
}

module.exports = routes

