const express = require('express');
const { Course, Lesson, Course_Comment } = require('../../db/models');
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

// loading lessons for a course based on its id
router.get('/:course_id/lessons', async (req, res) => {
    const course_id = parseInt(req.params.course_id)
    const lessons = await Lesson.findAll({where: {course_id: course_id}});
    const lessonsList = [];
    lessons.forEach(lesson => {
        lessonsList.push(lesson.toJSON());
    });
    res.status(200).json(lessonsList)
})


// loading comments for a course based on its id
router.get('/:course_id/comments', async (req, res) => {
    const course_id = parseInt(req.params.course_id);
    const comments = await Course_Comment.findAll({where: {course_id: course_id}})
    // console.log('comments in the server: ', comments)
    const commentsList = []
    comments.forEach(comment => {
        commentsList.push(comment.toJSON());
    });
    // console.log('comments list in the server: ', commentsList)
    res.status(200).json(commentsList);
})
module.exports = router; 