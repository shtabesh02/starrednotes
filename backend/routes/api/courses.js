const express = require('express');
const { Course, Lesson, Course_Comment } = require('../../db/models');
const { where, json } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res) => {
    const courses = await Course.findAll();
    res.status(200).json(courses)
})

// loading one course details by id
router.get('/:course_id', async (req, res) => {
    const course_id = parseInt(req.params.course_id);
    // console.log('course id: ', course_id)
    const course = await Course.findOne({ where: { id: course_id } })
    // console.log('course from server: ', course)
    res.status(200).json(course);
})

// loading lessons for a course based on its id
router.get('/:course_id/lessons', async (req, res) => {
    const {course_id} = req.params;
    console.log('course_id from backedn: ', course_id)
    const lessons = await Lesson.findAll({ where: { course_id: course_id } });
    console.log('from api: ', lessons)
    // const lessonsList = [];
    // lessons.forEach(lesson => {
    //     lessonsList.push(lesson.toJSON());
    // });
    res.status(200).json(lessons)
})


// loading comments for a course based on its id
router.get('/:course_id/comments', async (req, res) => {
    const course_id = parseInt(req.params.course_id);
    const comments = await Course_Comment.findAll({ where: { course_id: course_id } })
    // console.log('comments in the server: ', comments)
    const commentsList = []
    comments.forEach(comment => {
        commentsList.push(comment.toJSON());
    });
    // console.log('comments list in the server: ', commentsList)
    res.status(200).json(commentsList);
})

// loading all my courses
router.get('/instructor/:my_id', async (req, res) => {
    const { my_id } = req.params;
    const mycourses = await Course.findAll({ where: { user_id: my_id } });
    res.status(200).json(mycourses);
})

// adding a new comment
router.post('/:course_id/comment', async (req, res) => {
    const { user_id, course_id, comment } = req.body;
    const newcomment = await Course_Comment.create({ user_id, course_id, comment });
    // console.log()
    res.status(200).json(newcomment);
})

// delete a comment
router.delete('/comments/:comment_id', async (req, res) => {
    const { comment_id } = req.params;
    const thecomment = await Course_Comment.findOne({ where: { id: comment_id } })
    await thecomment.destroy();
    res.status(200).json(thecomment);
})

// update a comment
router.put('/comments/:comment_id', async (req, res) => {
    const { user_id, course_id, comment } = req.body;
    const commentid = req.params.comment_id;
    const targetcomment = await Course_Comment.findOne({ where: { id: commentid } })
    const uc = await targetcomment.set({
        user_id,
        course_id,
        comment
    })
    await targetcomment.save();
    res.status(200).json(uc);
})

// ading a new course
router.post('/newcourse', async (req, res) => {
    const { user_id, title, instructor, category, description } = req.body;
    const anewcourse = await Course.create({
        user_id,
        title,
        instructor,
        category,
        description
    })
    res.status(200).json(anewcourse)
})

// update a course based on its id
router.put('/:course_id/update', async (req, res) => {
    const { user_id, title, instructor, category, description } = req.body;
    const { course_id } = req.params;
    const currcourse = await Course.findOne({ where: { id: course_id } });
    console.log('api Course findONe: ', currcourse)
    const updatedcourse = currcourse.set(
        {
            user_id,
            title,
            instructor,
            category,
            description
        }
    );
    await updatedcourse.save();
    res.status(200).json(updatedcourse);
})

// deleting a course by its id
router.delete('/:course_id', async (req, res) => {
    const {course_id} = req.params;
    const thecourse = await Course.findOne({where: {id: course_id}})
    thecourse.destroy();
    res.status(200).json(thecourse);
})

// adding new lesson to a course
router.post('/:course_id/newlesson', async (req, res) => {
    const {course_id, user_id, title, content} = req.body;
    const newlesson = await Lesson.create({
        course_id,
        user_id,
        title,
        content
    })
    res.status(200).json(newlesson);
})

// updating a lesson by its id
router.put('/lessons/:lesson_id', async (req, res) => {
    const {course_id, user_id, title, content} = req.body;
    const {lesson_id} = req.params;
    const updatinglesson = await Lesson.findOne({where: {id: lesson_id}});
    const updatedlesson = updatinglesson.set({
        course_id,
        user_id,
        title,
        content
    });
    await updatinglesson.save();
    res.status(200).json(updatedlesson)
})

// deleting a lesson by its id
router.delete('/lessons/:lesson_id', async (req, res) => {
    const {lesson_id} = req.params;
    const deletinglesson = await Lesson.findOne({where: {id: lesson_id}});
    deletinglesson.destroy();
    res.status(200).json(deletinglesson);
})
module.exports = router; 