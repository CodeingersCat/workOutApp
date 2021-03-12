const router = require('express').Router();
const exercise = require('../models/exerciseModel')

router.route('/').get((req, res) => {
    exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json({"error": err}));
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date(req.body.rdate)
    const sysdate = Date(req.body.sysdate)

    const newExercise = new exercise({name, description, duration, date, sysdate})

    newExercise.save()
        .then(exercise => {
            res.json("Exercise added: " + exercise)
        })
        .catch(err => {
            res.status(400).json("error : "+ err)
        });
});

router.route('/:id').get((req, res) => {
    exercise.findById(req.params.id)
        .then(exers => {
            res.json(exers)
        })
        .catch(err => {
            res.status(400).json("Error : " + err)
        })
})

router.route('/delete/:id').delete((req, res) => {
    exercise.findByIdAndDelete(req.params.id)
        .then(exers => {
            res.json({"id": req.params.id})
        })
        .catch(err => {
            res.status(400).json("Error : " + err)
        })
})

router.route('/update/:id').post((req, res) => {
    exercise.findById(req.params.id)
        .then(exers => {
            exers.name = req.body.name
            exers.description = req.body.description
            exers.duration = req.body.duration
            exers.date = req.body.rdate
            exers.sysdate = req.body.sysdate
            exers.save()
                .then(() => {
                    res.json("Successfully updated");
                })
                .catch(err => {
                    res.status(400).json("Couldn't update due to : " + err);
                });
        })
        .catch(err => {
            res.status(400).json("Error : " + err)
        })
})


module.exports = router;