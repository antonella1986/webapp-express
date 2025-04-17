const router = require('express').Router();
const movieController = require('../controllers/movieController')

//index
router.get('/', movieController.index);

//show
router.get('/:id', movieController.show);

//post
router.post('/:id/reviews', movieController.post);

module.exports = router