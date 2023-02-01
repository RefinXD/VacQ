
const express = require('express')
const {getHospitals,getHospital,createHospital,updateHospital,deleteHospital} =
require('../controllers/hospitals')
router = express.Router()

router.route('/').get(getHospitals).post(createHospital);
router.route('/:id').get(getHospital).put(updateHospital).delete(deleteHospital);

module.exports = router;