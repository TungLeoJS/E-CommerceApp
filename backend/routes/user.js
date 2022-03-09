const router = require('express').Router();

router.get('/user/test', (req, res) => {
    res.send('user test is success')
})

router.post('/user/post', (req, res) => {
    const { user } = req.body;
    res.status(200).send(user)
});


module.exports = router;