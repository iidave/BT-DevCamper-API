const express = require('express');
const {
  getCourses,
  //   getCourse,
  //   createCourse,
  //   updateCourse,
  //   deleteCourse,
  //   getCoursesInRadius,
} = require('../controllers/courses');

const router = express.Router();

router.route('/').get(getCourses);

module.exports = router;
