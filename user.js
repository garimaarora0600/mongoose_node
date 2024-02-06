const express=require('express');
const controller=require('./router');
const router=express.Router();
router.post('/create',controller.postapi);
router.post('/marks/:_id',controller.postapim);
router.get('/list',controller.getapi);
router.get('/:_id',controller.getuser);
router.put('/update/:',controller.putapi);
router.delete('/delete/:_id',controller.deleteapi);
//user reg
// router.post('/login/:_id',controller.userreg);
router.post('/login',controller.userreg);
router.post('/profile',controller.verifyToken, controller.verify)
router.post('/pwd',controller.postpwd);

module.exports=
    router;