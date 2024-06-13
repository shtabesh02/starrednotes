const express = require('express');
const router = express.Router();
const {Completedlesson, User} = require('../../db/models');
const { where } = require('sequelize');

router.get('/:user_id', async (req, res) => {
    const {user_id} = req.params;
    // const mycompletedlessons = await User.findAll({where: {id:user_id},
    //     include: {
    //         model: Completedlesson
    //     }
    // });
    const mycompletedlessons = await Completedlesson.findAll({where: {user_id}});
    // console.log('my completed lessons: ', mycompletedlessons)
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