const express = require('express')

const {createUser,deleteUser,getAllUser,getUserById,updateSingle} = require('../controller/customerController')

const router = express.Router();

router.get('/', getAllUser)
router.post('/', createUser)
router.get('/:id', getUserById)
router.patch('/:id', updateSingle)
router.delete('/:id', deleteUser)


module.exports = router;