const Appointment = require('../models/Appointment');
const Hospital = require('../models/Hospital');

//@desc Get all appointments
//@route GET /api/v1/appointments
//@access Private

exports.getAppointments = async (req,res,next)=>{
    let query;
    let hospitalId =req.params.hospitalId;
    //General users can only see their appointments
    console.log(req.user.role)
    if(req.user.role !== 'admin'){
        query=Appointment.find({user:req.user.id,hospital:hospitalId
        }).populate({
            path:'hospital',
            select:'name province tel'
        });
    }else{
        query=Appointment.find({hospital:hospitalId}).populate({
            path:'hospital',
            select:'name province tel'
        });
    }
    try {
        const appointments = await query;

        res.status(200).json({
            success:true,
            count: appointments.length,
            data: appointments
        });
    }catch(err){
        console.log(err.stack);
        return res.staus(500).json({
            success:false,
            message:"Cannot find Appointment"
        });
    }
}


//@desc Get one appointment
//@route GET /api/v1/appointments/:id
//@access Public

exports.getAppointment = async (req,res,next)=>{
    try{
        const appointment = await Appointment.findById(req.params.id).populate({
            path: 'hospital',
            select: 'name province tel'
        });
        if(!appointment){
            return res.status(404).json({success:false,message:`No appointment with the id of ${req.params.id}`})
        }
        res.status(200).json({success: true,data:appointment});
    }catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message: "Cannot find Appointment"})
    }
}


//@desc Add one appointment
//@route GET /api/v1/hospitals/:hospitalId/appointments/
//@access Private

exports.addAppointment = async (req,res,next)=>{
    try{
        req.body.hospital = req.params.hospitalId;

        const hospital = await Hospital.findById(req.params.hospitalId)

        if(!hospital){
            return res.status(404).json({success:false,message:`Cannot find hospitalId of ${req.params.hospitalId}`})
        }
        const appointment = await Appointment.create(req.body);
        res.status(200).json({success: true,data:appointment});

    }catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message: "Cannot add Appointment"})
    }
}

//@desc Update one appointment
//@route PUT /api/v1/appointments/:id
//@access Private

exports.updateAppointment = async (req,res,next)=>{
    try{
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment){
            return res.status(404).json({success:false,message:`Cannot find appointment with ${req.params.id}`})

        }
        if(appointment.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({sucess:false,message:`User ${req.user.id} is not authorized`})
        }
        appointment = await Appointment.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});

        res.status(200).json({success:true,data: appointment});
    }
    catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot Update appointment"})
    }
}


//@desc Add one appointment
//@route GET /api/v1/hospitals/:hospitalId/appointments/
//@access Private

exports.addAppointment = async (req,res,next)=>{
    try{
        req.body.hospital = req.params.hospitalId;

        const hospital = await Hospital.findById(req.params.hospitalId)

        if(!hospital){
            return res.status(404).json({success:false,message:`Cannot find hospitalId of ${req.params.hospitalId}`})
        }

        req.body.user=req.user.id
        //check for existed appointment
        const existedAppointments = await Appointment.find({user:req.user.id});
        //If the user is not an admin,they can only create 3 appointment.
        if(existedAppointments.length >= 3 && req.user.role !== 'admin'){
            return res.status(400).json({success:false,message:`The user with ID ${req.user.id} already has 3 appointments`});
        }
        const appointment = await Appointment.create(req.body);
        res.status(200).json({success: true,data:appointment});

    }catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message: "Cannot add Appointment"})
    }
}

//@desc Delete one appointment
//@route DELETE /api/v1/appointments/:id
//@access Private

exports.deleteAppointment = async (req,res,next)=>{
    try{
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment){
            return res.status(404).json({success:false,message:`Cannot find appointment with ${req.params.id}`})

        }
        if(appointment.user.toString()!== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({sucess:false,message:`User ${req.user.id} is not authorized`})
        }
        await appointment.remove();

        res.status(200).json({success:true,data:{}});
    }
    catch(err){
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot delete appointment"})
    }
}