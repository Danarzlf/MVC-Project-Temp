const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')

module.exports = (role) => {
    return catchAsync(async (req, res, next) => {
        if (req.user.Profile.role !== role) {
            throw new ApiError(httpStatus.FORBIDDEN, `You are not ${role}!`)
        } else {
            next();
        }
    })
}
