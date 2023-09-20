const Category = require('../models/parser')
const asyncHandler = require('../middleware/asyncHandler');
const onHashSqlText = require("../utils/hashSqlText");

exports.createCategory = asyncHandler(async (req, res) => {
    try {
        const originalText = req.body.originalText
        const parseText = onHashSqlText(originalText)
        console.log('originalText', originalText)
        console.log('parseText', parseText)
        const newData = {
            originalText,
            parseText
        }
        const result = await req.db.parser.create(newData)
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err, message: '障害発生'})
    }
});