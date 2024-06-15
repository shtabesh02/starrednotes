const express = require('express');
const router = express.Router();
const { User, Course_Enrollment, Course, Lesson, Completedlesson } = require('../../db/models');
const { where, Sequelize } = require('sequelize');

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    // the bellow commented getCourses() works before getting number of lessons
    // const enrolledCourses = await user.getCourses();

    const enrolledCourses = await user.getCourses({
        attributes: ['id', 'title', 'instructor', 'category', 'description', 'createdAt', 'updatedAt', [Sequelize.fn('COUNT', Sequelize.col('Lessons.id')), 'numOfLessons']],
        include: [{
            model: Lesson,
        }],
        group: ['Course.id']
    });


    // console.log('enrolledCourses: ', enrolledCourses)
    res.status(200).json(enrolledCourses);
});

router.post('/enrollnow', async (req, res) => {
    const { user_id, course_id } = req.body;
    const gotenrolled = await Course_Enrollment.create({
        user_id,
        course_id
    });

    const user = await User.findByPk(user_id);
    const newEnrollment = await user.getCourses()
    res.status(200).json(newEnrollment);
})
module.exports = router