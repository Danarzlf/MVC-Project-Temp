const router = require('express').Router()

// controller
const Warehouse = require('../controller/warehouseController')

// middleware
const Authentication = require('../middlewares/authenticate')

router.get('/', Authentication, Warehouse.findWarehouses)
router.post('/', Authentication, Warehouse.createWarehouse)
router.get('/:id', Authentication, Warehouse.findWarehouseById)

module.exports = router