// 

const router = require('express').Router();
 
// router.get('/', function (req, res, next) {
//    res.send('hello, user')
// });

//router.use('/users', require('./users'))
router.use('/tickets', require('./tickets'))
router.use(function (req, res, next) {
   const err = new Error('Not found.');
   err.status = 404;
   next(err);
});


// router.use('/cats', require('./cats')); // matches all requests to /api/cats/
// router.use('/dogs', require('./dogs')); // matches all requests to  /api/dogs/
 

 
module.exports = router;

