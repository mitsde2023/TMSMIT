const express = require('express');
const router = express.Router();
const QueryCategory = require('../models/QueryCategory');
const QuerySubcategory = require('../models/QuerySubcategory');
const Department = require('../models/Department');
const SubDepartment = require('../models/SubDepartment');

router.get('/categories/:QueryCategoryID', async (req, res) => {
  try {
    const QueryCategoryID = req.params.QueryCategoryID;
    const categoriesWithSubcategories = await QueryCategory.findAll({
      where: { QueryCategoryID: QueryCategoryID },
      include: [{ model: QuerySubcategory }],
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
      include: [{ model: QuerySubcategory }]
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


// router.post('/add', async (req, res) => {
//   try {
//     const { departments } = req.body;

//     // Loop through departments
//     for (const departmentData of departments) {
//       const { DepartmentName, SubDepartments } = departmentData;

//       // Save department
//       const department = await Department.create({ DepartmentName });

//       // Loop through sub-departments
//       for (const subDepartmentData of SubDepartments) {
//         const { SubDepartmentName, QueryCategories } = subDepartmentData;

//         // Save sub-department
//         const subDepartment = await SubDepartment.create({ SubDepartmentName, DepartmentId: department.DepartmentID });

//         // Loop through query categories
//         for (const queryCategoryData of QueryCategories) {
//           const { QueryCategoryName, QuerySubcategories } = queryCategoryData;

//           // Save query category
//           const queryCategory = await QueryCategory.create({ QueryCategoryName, SubDepartmentID: subDepartment.SubDepartmentID, DepartmentId: department.DepartmentID });

//           // Loop through query subcategories
//           for (const querySubcategoryData of QuerySubcategories) {
//             // Save query subcategory
//             await QuerySubcategory.create({ QuerySubcategoryName: querySubcategoryData, QueryCategoryId: queryCategory.QueryCategoryID });
//           }
//         }
//       }
//     }

//     res.status(201).json({ message: 'Department data saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

router.post('/add', async (req, res) => {
  try {
    const { departments } = req.body;

    // Loop through departments
    for (const departmentData of departments) {
      const { DepartmentName, SubDepartments } = departmentData;

      // Save department
      const department = await Department.create({ DepartmentName });

      // Loop through sub-departments
      for (const subDepartmentData of SubDepartments) {
        const { SubDepartmentName, QueryCategories } = subDepartmentData;

        // Save sub-department
        const subDepartment = await SubDepartment.create({ SubDepartmentName, DepartmentId: department.DepartmentID });

        // Loop through query categories
        for (const queryCategoryData of QueryCategories) {
          const { QueryCategoryName, QuerySubcategories } = queryCategoryData;

          // Save query category
          const queryCategory = await QueryCategory.create({ QueryCategoryName, SubDepartmentID: subDepartment.SubDepartmentID , DepartmentId: department.DepartmentID });

          // Loop through query subcategories
          for (const querySubcategoryData of QuerySubcategories) {
            // Save query subcategory
            await QuerySubcategory.create({ QuerySubcategoryName: querySubcategoryData, QueryCategoryId: queryCategory.QueryCategoryID });
          }
        }
      }
    }

    res.status(201).json({ message: 'Department data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
