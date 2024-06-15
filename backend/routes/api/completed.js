const express = require('express');
const router = express.Router();
const { Completedlesson, User, Course } = require('../../db/models');
const { where, Sequelize } = require('sequelize');

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    // const mycompletedlessons = await User.findAll({where: {id:user_id},
    //     include: {
    //         model: Completedlesson
    //     }
    // });

    // This works before including model
    // const mycompletedlessons = await Completedlesson.findAll({where: {user_id}});

    const mycompletedlessons = await Completedlesson.findAll({
        where: { user_id: user_id },
        attributes: ['id', 'user_id', 'lesson_id', 'course_id', 'createdAt', 'updatedAt', [Sequelize.fn('COUNT', Sequelize.col('course_id')), 'numOfLessondone']],
        // attributes: ['course_id', [Sequelize.fn('COUNT', Sequelize.col('course_id')), 'numOfLessondone']],
        group: ['course_id']
    });
 
    res.status(200).json(mycompletedlessons);
})


// marked as complete
router.post('/markascomplete', async (req, res) => {
    const { lesson_id, course_id, user_id } = req.body;

    const thelesson = await Completedlesson.create({
        lesson_id,
        course_id,
        user_id
    });

    res.status(200).json(thelesson);
})


module.exports = router;