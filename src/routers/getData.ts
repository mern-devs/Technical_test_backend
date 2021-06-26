import { Request, Response } from 'express';
const fs = require('fs');
let rawdata = fs.readFileSync('src/seed/raw_brushing_cycle.json');
let brushHistory = JSON.parse(rawdata);

const express = require('express')
const router = new express.Router();
router.get("/getData/brushHistory", async (req: Request, res: Response) => {
    res.send(brushHistory)
});
module.exports = router;