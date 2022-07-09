const videos = require('../database/models/video')

class VideosController {

    static listAllVideos = (req, res) => {
        videos.find({}, (err, videos) => {
            if (err) return res.status(500).send({ message: err.message})

            return res.status(200).send(videos)
        })
    }

    static listVideo = (req, res) => {
        let id = req.params.id;

        videos.find({
            id: id
        }, (err, video) => {
            if (err) return res.status(500).send({ message: err.message})

            if (video.length == 0) return res.status(400).send({ message: 'Vídeo não encontrado'})
            
            return res.status(200).json(video)
        })
    }

    static createVideo = async (req, res) => {
        let video = req.body

        if (!video.id || !video.titulo || !video.descricao || !video.url) return res.status(400).send({ message: "Você não informou todas as informações."})

        if (video.titulo.length > 30) return res.status(400).send({ message: "Você informou mais que 30 caracteres no titulo do video."})
        if (video.descricao.length > 1000) return res.status(400).send({ message: "Você informou mais que 100 caracteres na descrição do video."})

        if (isNaN(video.id)) return res.status(400).send({ message: "Você informou um id inválido."})

        let regex = new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$")

        if (!video.url.match(regex)) return res.status(400).send({ message: "Você inseriu uma URL inválida."})

        let videoChecked = new videos(video);

        videoChecked.save((err) => {
            if (err) return res.status(500).send({ message: err.message})

            return res.status(201).json(video);
        })
    }

    static updateVideo = (req, res) => {
        const id = req.params.id;

        videos.findOneAndUpdate({
            id: id
            
        },{
            $set: req.body
        },  (err, video) => {
            if (err) return res.status(500).send({ message: err.message})

            return res.status(200).json(video)
        })
    }

    static deleteVideo = (req, res) => {
        const id = req.params.id

        videos.deleteOne({
            id: id
        }, (err) => {
            if (err) return res.status(500).send({ message: err.message})

            return res.status(200).send({ message: 'O video foi deletado com sucesso.'})
        })
    }
}


module.exports = VideosController