const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const { Course_Comment } = require('../../db/models');

// loading comments for a course based on its id -->
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


// adding a new comment
// comment validation
const validateComment = [
    check('comment')
        .notEmpty()
        .withMessage('Add a comment.')
        .isLength({ max: 255 })
        .withMessage('The comment must be less than 255 characters.'),
    handleValidationErrors
]
router.post('/:course_id/comment', validateComment, async (req, res) => {
    const { user_id, course_id, comment } = req.body;
    const newcomment = await Course_Comment.create({ user_id, course_id, comment });
    // console.log()
    res.status(200).json(newcomment);
})



// loading a comment by its id -->
router.get('/:course_id/comments/:comment_id', async (req, res) => {
    const { course_id, comment_id } = req.params;
    const mycomment = await Course_Comment.findAll({ where: { id: comment_id, course_id: course_id } })
    // console.log('my coment from db: ', mycomment)
    res.status(200).json(mycomment)
})


// delete a comment
router.delete('/:comment_id', async (req, res) => {
    const { comment_id } = req.params;
    const thecomment = await Course_Comment.findOne({ where: { id: comment_id } })
    await thecomment.destroy();
    res.status(200).json(thecomment);
})

// update a comment
router.put('/:comment_id', validateComment, async (req, res) => {
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


module.exports = router;