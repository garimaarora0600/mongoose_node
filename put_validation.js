// validation using joi
const joi=require('joi');

const putValidate=joi.object({
    fname:joi.string().min(3).max(30).optional(),
    lname:joi.string().min(3).max(30).optional(),
    email:joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] }}).optional(),
    dialCode:joi.string().min(3).max(4).optional(),
    // phone:joi.number().integer().max(10),
    phone:joi.string().pattern(/^\d{10}$/).optional(),
    subject:joi.string().min(3).max(30).optional(),
    marks:joi.string().pattern(/^\d{3}$/).optional(),
})

module.exports=putValidate;