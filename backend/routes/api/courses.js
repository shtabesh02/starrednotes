const express = require('express');
const { Course } = require('../../db/models');
const { where } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses)
})

router.get('/:course_id', async (req, res) => {
    const course_id = parseInt(req.params.course_id);
    console.log('course id: ', course_id)
    const course = await Course.findOne({where: {id: course_id}})
    console.log('course from server: ', course)
    res.json(course);
})
module.exports = router; 