const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    address:{
        type: String,
        required: [true,'Please add an address']
    },
    district:{
        type: String,
        required: [true,'Please add an address']
    },
    province:{
        type: String,
        required: [true,'Please add an address']
    },
    postalcode:{
        type: String,
        required: [true,'Please add an address'],
        maxlength:[5,'Postal Code can not be more than 5 digits']
    },
    tel:{
        type: String,
    },
    region:{
        type: String,
        required: [true,'Please add an address']
    },
})

module.exports = mongoose.model('Hospital',HospitalSchema)