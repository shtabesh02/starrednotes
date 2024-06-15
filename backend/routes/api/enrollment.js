const express = require('express');
const router = express.Router();
const { User, Course_Enrollment, Course, Lesson, Completedlesson } = require('../../db/models');
const { where, Sequelize } = require('sequelize');
router.get('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        console.log('user_id: ', user_id)
        const user = await User.findByPk(user_id);
        console.log('user: ', user);
        if(!user){
            return res.status(404).json(
                {
                    message: "You need to log in first."
                }
            )
        }
        // the bellow commented getCourses() works before getting number of lessons
        // const enrolledCourses = await user.getCourses();
        const enrolledCourses = await user.getCourses({
            attributes: ['id', 'title', 'instructor', 'category', 'description', 'createdAt', 'updatedAt', [Sequelize.fn('COUNT', Sequelize.col('Lessons.id')), 'numOfLessons']],
            include: [{
                model: Lesson,
                attributes: [], // the attributes of Lesson is not needed now.
            }],
            group: ['Course.id']
        });
        console.log('enrolledCourses: ', enrolledCourses)
        res.status(200).json(enrolledCourses);
    } catch (error) {
        res.status(404).json({
            message: "You are not enrolled in to any course. Get enrolled in a course, and try again later."
        })
    }
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