const httpStatus = require('http-status')
const { Profile } = require('../models')

const imagekit = require('../lib/imageKit')
const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')

const updateProfile = catchAsync(async (req, res) => {
    const id = req.params.id
    const { address, city } = req.body
    const files = req.files

    const profile = await Profile.findByPk(id)

    if (!profile) {
        throw new ApiError(httpStatus.NOT_FOUND, `Profile with this id ${id} not found`)
    }

    req.body.images = []

    // menggunakan promise.all untuk file2 yg tadi, semua nya kena proses bawah ini
    await Promise.all(
        files.map(async (file) => {
            // untuk dapat extension file nya
            const split = file.originalname.split('.')
            const ext = split[split.length - 1]

            // upload file ke imagekit
            const img = await imagekit.upload({
                file: file.buffer, //required
                fileName: `IMG-${Date.now()}.${ext}`, //required
            })

            // req.body.images ini si images itu array
            req.body.images.push(img.url)
        })
    )

    await Profile.update(
        {
            address,
            city,
            images: req.body.images,
            role: 'Admin',
            userId: 1
        },
        {
            where: {
                id
            }
        }
    )

    res.status(200).json({
        status: 'Success',
        message: 'successfully update this profile'
    })
})


module.exports = {
    updateProfile,
}
