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

// adding a new comment
router.post('/:course_id/comment', async (req, res) => {
    const {user_id, course_id, comment} = req.body;
    const newcomment = await Course_Comment.create({user_id, course_id, comment});
    // console.log()
    res.status(200).json(newcomment);
})

// delete a comment
router.delete('/comments/:comment_id', async (req, res) => {
    const {comment_id} = req.params;
    const thecomment = await Course_Comment.findOne({where: {id: comment_id}})
    await thecomment.destroy();
    res.status(200).json(thecomment);
})

// update a comment
router.put('/comments/:comment_id', async (req, res) => {
    const {user_id, course_id, comment} = req.body;
    const commentid = req.params.comment_id;
    const targetcomment = await Course_Comment.findOne({where: {id: commentid}})
    const uc = await targetcomment.set({
        user_id,
        course_id,
        comment
    })
    await targetcomment.save();
    res.status(200).json(uc);
})
module.exports = router; 