const httpStatus = require('http-status')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, Warehouse, Profile } = require('../models')
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync')

const register = catchAsync(async (req, res) => {
    const { name, email, password, warehouseName } = req.body

    // validasi jika email sudah kepake
    const user = await User.findUser(email)
    if (user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "email already exist!")
    }

    // validasi minimum password length
    const passswordLength = password.length <= 8
    if (passswordLength) {
        throw new ApiError(httpStatus.BAD_REQUEST, "minimum password length must be 8 charater or more")
    }

    // enkripsi password
    const hashedPassword = bcrypt.hashSync(password, 10)

    // cari atau buat baru warehouse
    const [warehouse, newWarehouse] = await Warehouse.findOrCreate({
        where: {
            name: warehouseName,
        },
        defaults: { name: warehouseName },
    })

    // validasi kalau warehouse id nya sudah terpakai, maka gagal melanjutkan
    if (!newWarehouse) {
        throw new ApiError(httpStatus.CONFLICT, 'warehouse Name already taken yeah !')
    }

    const warehouseId = warehouse.id

    // register user baru
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        warehouseId
    })

    const newProfile = await Profile.create({
        userId: newUser.id
    })


    res.status(201).json({
        status: 'success',
        data: {
            newUser,
            warehouse,
            newWarehouse,
            newProfile
        }
    })
})

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    // cari user berdasarkan email
    const user = await User.findOne({
        where: {
            email
        },
        include: [
            {
                model: Warehouse,
            },
            {
                model: Profile
            }
        ]
    })

    console.log(user.Profile.role)

    // gagal melanjutkan karena username nya tidak ada 
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist")
    }

    // check password user, jika success login dapat response intinya TOKEN
    if (user && bcrypt.compareSync(password, user.password)) {

        // generate token utk user yg success login
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            warehouseId: user.warehouseId,
            role: user.Profile.role
        }, 'rahasia')

        res.status(200).json({
            status: 'Success',
            data: {
                username: user.name,
                email: user.email,
                warehouse: user.Warehouse.name,
                token
            }
        })
    } else {
        throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Password");
    }
})

const authenticatedUser = catchAsync(async (req, res) => {
    res.status(200).json({
        status: 'Success',
        data: {
            userId: req.user.id,
            username: req.user.username,
            warehouseId: req.user.warehouseId,
        }
    })
})

module.exports = {
    register,
    login,
    authenticatedUser,
}
