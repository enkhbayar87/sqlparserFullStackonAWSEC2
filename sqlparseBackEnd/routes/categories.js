const express = require('express');
const router = express.Router();
const { getCategories, 
        getCategory, 
        createCategory, 
        deleteCategory, 
        updateCategory} 
        = require("../controller/categories")


router.route('/').post(createCategory);

module.exports = router;