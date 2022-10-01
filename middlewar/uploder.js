const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})
const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const suppatedImage = /png|jpg|webp/;
        const extension = path.extname(file.originalname)

        if (suppatedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Must be jpg or png file"));
        }
    },
    limits: {
        fieldSize: 5000000,
    }
})

module.exports = uploader;