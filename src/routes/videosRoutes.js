const express = require('express');
const VideosController = require('../controllers/videosController');

const router = express.Router();

router
    .get("/videos", VideosController.listAllVideos)
    .get("/videos/:id", VideosController.listVideo)
    .post("/videos", VideosController.createVideo)
    .patch("/videos/:id", VideosController.updateVideo)
    .delete("/videos/:id", VideosController.deleteVideo)
   


module.exports = router;