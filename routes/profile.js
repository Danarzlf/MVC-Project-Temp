const router = require('express').Router()

// controller
const Profile = require('../controller/profileController')

// middleware
const Authentication = require('../middlewares/authenticate')
const Uploader = require('../middlewares/uploader')
const checkOwnership = require('../middlewares/checkCredentials')

router.put('/:id', 
    Authentication, 
    checkOwnership('Profile'),
    Uploader.array('images'), // req.file.images
    Profile.updateProfile
)

module.exports = router
