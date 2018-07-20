var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'botUI_api.ai' });
});

router.get('/', function (req, res) {
    console.log(res.cookie);
});




module.exports = router;
