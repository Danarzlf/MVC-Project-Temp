const httpStatus = require('http-status');
const multer = require('multer');
const ApiError = require('../utils/ApiError');

const multerFiltering = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        return cb(new ApiError(httpStatus.BAD_REQUEST, 'Only .png, .jpg and .jpeg format allowed!'));
    }
}

const upload = multer({
    fileFilter: multerFiltering
})

module.exports = upload
