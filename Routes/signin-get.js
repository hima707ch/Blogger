const express = require("express");
const router = express.Router();

router.get("", function (req, res) {
    res.render("sign in", { status: "" })
})

module.exports = router;