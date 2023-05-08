const { Warehouse, Product, User } = require('../models')

const createWarehouse = async (req, res) => {
    const { name, address, owner } = req.body
    try {
        const newWarehouse = await Warehouse.create({
            name,
            address,
            owner,
        })

        res.status(201).json({
            status: 'success',
            data: {
                newWarehouse
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const findWarehouses = async (req, res) => {
    try {
        const warehouses = await Warehouse.findAll({
            include: [{
                model: Product
            }, {
                model: User
            }]
        })
        res.status(200).json({
            status: 'Success',
            data: {
                warehouses
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const findWarehouseById = async (req, res) => {
    try {
        const warehouse = await Warehouse.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Product,
                attributes: ['id', ['name', 'namaToko'], 'stock'] 
                // name = nama colomnya, namaToko = new value as nama colomn name
            }
        })
        res.status(200).json({
            status: 'Success',
            data: {
                warehouse
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

module.exports = {
    createWarehouse,
    findWarehouses,
    findWarehouseById,
}
