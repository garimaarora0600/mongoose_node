// validation using joi
const joi=require('joi');

const validate=joi.object({
    fname:joi.string().min(3).max(30).required(),
    lname:joi.string().min(3).max(30).required(),
    email:joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).required(),
    dialCode:joi.string().min(3).max(4).required(),
    // phone:joi.number().integer().max(10),
    phone:joi.string().pattern(/^\d{10}$/).required(),
    subject:joi.string().min(3).max(30),
    marks:joi.string().pattern(/^\d{3}$/),
})

module.exports=validate;