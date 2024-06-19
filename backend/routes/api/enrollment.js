const express = require('express');
const router = express.Router();
const { User, UserCourse, Course, Lesson, Completedlesson } = require('../../db/models');
const { where, Sequelize } = require('sequelize');
router.get('/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        // console.log('user_id: ', user_id)
        const user = await User.findByPk(user_id);
        // console.log('user: ', user);
        if (!user) {
            return res.status(404).json(
                {
                    message: "You need to log in first."
                }
            )
        }
        const enrolledcourses = await user.getCourses({
            attributes: ['id', 'title', 'instructor', 'category', 'description', 'createdAt', 'updatedAt'],
            include: [
                { model: Lesson, attributes: ['id', 'completed', 'course_id'] }
            ],
            // group: ['Course.id']
        });

        const coursesWithLessonCounts = enrolledcourses.map(course => {
            const numOfLessons = course.Lessons.length;
            const numOfCompletedLessons = course.Lessons.filter(lesson => lesson.completed).length;
            return { ...course.toJSON(), numOfLessons, numOfCompletedLessons };
        });

        res.status(200).json(coursesWithLessonCounts);

    } catch (error) {
        res.status(404).json({
            message: "You are not enrolled in to any course. Get enrolled in a course, and try again later."
        })
    }
});

router.post('/enrollnow', async (req, res) => {
    const { user_id, course_id } = req.body;
    const gotenrolled = await UserCourse.create({
        user_id,
        course_id
    });

    const user = await User.findByPk(user_id);
    const newEnrollment = await user.getCourses()
    res.status(200).json(newEnrollment);
})
module.exports = router