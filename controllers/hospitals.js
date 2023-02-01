//@desc Get all hospitals
//@route  GET /api/v1/hospitals
//@access Public
exports.getHospitals = (req,res,next) => {
    res.status(200).json({success:true,msg:'show all hostpitals'});
}

//@desc Get single hospitals
//@route  GET /api/v1/hospitals/:id
//@access Public
exports.getHospital = (req,res,next) => {
    res.status(200).json({success:true,msg:`show hospitals ${req.params.id}`});
}

//@desc Create new hospital
//@route  GET /api/v1/hospitals
//@access Private
exports.createHospital=(req,res,next) =>{
    res.status(200).json({success:true,msg:'Create new hospitals'});
}

//@desc Update hospital
//@route  GET /api/v1/hospitals/:id
//@access Private

exports.updateHospital=(req,res,next) =>{
    res.status(200).json({success:true,msg:`Update hostpital ${req.params.id}`});
}


//@desc Delete hospital
//@route  GET /api/v1/hospitals/:id
//@access Private

exports.deleteHospital = (req,res,next) =>{
    res.status(200).json({success:true,msg:`Delete hostpital ${req.params.id}`});
}