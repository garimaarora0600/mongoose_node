const cron=require('node-cron');
cron.schedule('*/2 * * * * *',()=>{
    console.log('running every second 2,3');
})