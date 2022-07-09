const { Schema, model } = require('mongoose');

const videoSchema = new Schema(
    {
        id: { type: String, required: true, unique: true},
        titulo: { type: String, required: true},
        descricao: { type: String, required: true},
        url: { type: String, required: true}

    }
)

const videos = model('videos', videoSchema);

module.exports = videos;