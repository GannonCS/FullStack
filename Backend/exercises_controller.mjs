/**
 * Gannon Strand
 */
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid (date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function isValidExercise(body) {
    const requiredFields = ['name', 'reps', 'weight', 'unit', 'date'];
    for (let field of requiredFields) {
        if (field in body == false) {
            return false;
        }
    }
    if (Object.keys(body).length !== 5) {
        return false;
    }
    if (body.name === null || body.reps === null || body.weight === null || body.unit === null || body.date === null) {
        return false;
    }
    if (typeof body.name != 'string' || body.name.length === 0) {
        return false;
    }
    if (Number.isInteger(body.reps) === false || body.reps <= 0) {
        return false;
    }
    if (Number.isInteger(body.weight) === false || body.weight <= 0) {
        return false;
    }
    if (body.unit != "kgs" && body.unit != "lbs") {
        return false;
    }
    const date = isDateValid(body.date);
    if (date === false) {
        return false;
    }
    return true;
}

app.post('/exercises', asyncHandler(async(req, res) => {
    if (isValidExercise(req.body) === false) {
        return res.status(400).json({Error: "Invalid request"})
    }
    const exercise = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
    return res.status(201).json(exercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const allExercises = await exercises.getExercises();
    return res.status(200).json(allExercises);
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
    const id = req.params._id
    const exercise = await exercises.getExerciseByID(id);
    if (!exercise) {
        return res.status(404).json({Error: "Not found"});
    }
    return res.status(200).json(exercise);
}));

app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    if (isValidExercise(req.body) === false) {
        return res.status(400).json({Error: "Invalid request"})
    }
    const id = req.params._id
    const exist = await exercises.getExerciseByID(id);
    if (!exist) {
        return res.status(404).json({Error: "Not found"});
    }
    const update = await exercises.updateExercise(id, req.body);
    return res.status(200).json(update);
}));

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deleteExercise = await exercises.deleteExerciseByID(id);
    if (deleteExercise === 0){
        return res.status(404).json({Error: "Not found"});
    }
    return res.status(204).send();
}));
