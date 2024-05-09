const express = require('express');
const { Course, Lesson } = require('../../db/models');
const { where, json } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses)
})

// loading one course details by id
router.get('/:course_id', async (req, res) => {
    const course_id = parseInt(req.params.course_id);
    // console.log('course id: ', course_id)
    const course = await Course.findOne({where: {id: course_id}})
    // console.log('course from server: ', course)
    res.json(course);
})

// loading lessons
router.get('/:course_id/lessons', async (req, res) => {
    console.log('heyheyhey...1')
    const course_id = parseInt(req.params.course_id)
    console.log('cours_id: ', course_id)
    const lessons = await Lesson.findAll({where: {course_id: course_id}});
    console.log('lessons: ', lessons)
    const lessonsList = [];
    lessons.forEach(lesson => {
        lessonsList.push(lesson.toJSON());
    });
    console.log('lessonList: ', lessonsList)
    res.status(200).json(lessonsList)
})
module.exports = router; 