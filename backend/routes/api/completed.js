const express = require('express');
const router = express.Router();
const { Completedlesson, User, Course, Lesson } = require('../../db/models');
const { where, Sequelize } = require('sequelize');
const lesson = require('../../db/models/lesson');

router.get('/:user_id', async (req, res) => {
    try {        
        const { user_id } = req.params;
        const mycompletedlessons = await Lesson.findAll({
            where: { completed: true },
            attributes: ['id', 'course_id', 'user_id', 'completed'],
            // group: ['course_id']
        });

     

        res.status(200).json(mycompletedlessons);
    } catch (error) {
        res.status(404).json({
            message: "You have not started any lesson yet."
        })
    }
})


// marked as complete
router.put('/markascomplete', async (req, res) => {
    const { lesson_id, course_id, user_id, completed } = req.body;

    const lesson2mark = await Lesson.findByPk(lesson_id);
    const markedlesson = await lesson2mark.set({
        completed
    });
    await markedlesson.save();
    res.status(200).json(markedlesson);
})


module.exports = router;