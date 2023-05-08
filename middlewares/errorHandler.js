const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')

const handleErrorDB = err => {
    const error = err.errors[0]
    const message = `invalid ${error.path} : ${error.value}`
    return new ApiError(httpStatus.BAD_REQUEST, message)
}

const sendError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

module.exports = (err, req, res, next) => {
    console.log(err.name)
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (err.name === 'SequelizeValidationError') {
        err = handleErrorDB(err)
    }

    sendError(err, res)
}
