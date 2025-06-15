/**
 * Gannon Strand
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const EXERCISE_CLASS = 'Exercise';

const exerciseSchema = mongoose.Schema({
    name: String,
    reps: Number, 
    weight: Number,
    unit: String,
    date: String,
});

const Exercise = mongoose.model(EXERCISE_CLASS, exerciseSchema);

const createExercise = async(name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

const getExercises = async() => {
    return Exercise.find({});
}

const getExerciseByID = async(id) => {
    return Exercise.findById(id);
}

const updateExercise = async(id, data) => {
    const result = await Exercise.updateOne({_id: id}, data);
    return Exercise.findById(id);
}

const deleteExerciseByID = async(id) => {
    const result = await Exercise.deleteOne({ _id: id });
    return result.deletedCount;
}

export { connect, createExercise, getExercises, getExerciseByID, updateExercise, deleteExerciseByID};