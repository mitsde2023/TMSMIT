const express = require('express');
const router = express.Router();
const QueryCategory = require('../models/QueryCategory');
const QuerySubcategory = require('../models/QuerySubcategory');

router.get('/categories/:QueryCategoryID', async (req, res) => {
    try {
      const QueryCategoryID = req.params.QueryCategoryID;
      const categoriesWithSubcategories = await QueryCategory.findAll({
        where: {QueryCategoryID: QueryCategoryID},
        include: [{ model: QuerySubcategory}],
      });
      res.json(categoriesWithSubcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.get('/categories', async (req, res) => {
    try {
      const categoriesWithSubcategories = await QueryCategory.findAll({
        include: [{ model: QuerySubcategory}]
      });
      res.json(categoriesWithSubcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
router.post('/categories', async (req, res) => {
    try {
      const { categories } = req.body;
  
      if (!Array.isArray(categories)) {
        return res.status(400).json({ error: 'Invalid request body format. Expected an array of categories.' });
      }
  
      const createdCategories = await Promise.all(
        categories.map(async ({ name, subcategories }) => {
          // Create a new category
          const newCategory = await QueryCategory.create({ name });
      
          // Check if subcategories are provided
          if (subcategories && Array.isArray(subcategories)) {
            // Create subcategories one by one with the associated category ID
            await Promise.all(
              subcategories.map(async (subcategoryName) => {
                await QuerySubcategory.create({
                  name: subcategoryName,
                  QueryCategoryId: newCategory.QueryCategoryID, // Assuming the foreign key field name is QueryCategoryID
                });
              })
            );
          }
      
          return newCategory;
        })
      );
  
      res.json(createdCategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;
