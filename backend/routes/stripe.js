const router = require('express').Router();
const stripe = require("stripe")('sk_test_51KeL9nEI9dY11rlBw9xtB8znRNeZEtVhzOcPgwzYU8cHGQGF1lvgaU9qWkWOlN0baT5OTo3y2wCRu8dDnvax69Mq000nkza58T');

router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) => {
        if(stripeErr) {
            console.log(stripeErr)
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    })
})

module.exports = router;