const httpStatus = require('http-status')
const models = require('../models')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')

module.exports = (modelName) => {
    const Model = models[modelName]

    return catchAsync(async (req, res, next) => {
        const data = await Model.findByPk(req.params.id)
        let credentialId 
        if (modelName === 'Profile') {
            credentialId = req.user.Profile.userId
        } else if (modelName === 'Warehouse') {
            credentialId = req.user.warehouseId
        } else if (modelName === 'Product') {
            credentialId = req.user.warehouseId
        }
        if (data.id !== credentialId) {
            throw new ApiError(httpStatus.FORBIDDEN, "You don't have credential to do this!")
        } else {
            next()
        }
    })
}
