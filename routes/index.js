var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/automate', function (req, res, next) {
    console.log('Path of file in parent dir:', require('path').resolve(__dirname, '../app.js'));
    const controller = require('../controllers/houtrakController.js');
    controller.registerStartTime().then(r => 'lel');
    res.render('automate', {title: 'Automate form'});
});

module.exports = router;
