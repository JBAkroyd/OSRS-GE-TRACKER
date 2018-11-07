
const router = require('express').Router();
// const template = require('./template');
const runescape = require('./runescape');


// router.use('/api', template)
router.use('/runescape', runescape);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;
