const express = require('express');
const router = express.Router();
const { User, Course_Enrollment, Course } = require('../../db/models');
const { where } = require('sequelize');


router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    // const enrolledCourses = await User.findAll({ where: {id: user_id},
    // include: [{
    //     model: Course,
    //     through: {
    //         model: Course_Enrollment
    //     }
    // }]
    // });

    const user = await User.findByPk(user_id);

    const enrolledCourses = await user.getCourses();

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