import express from "express";
// import client from "../connection.js";

const router = express.Router();

router.post('/', (req, res) => {
    try {
        console.log("sss");
    } catch (error) {
        res.status(500);
        res.send(error);
    }
})

export default router;