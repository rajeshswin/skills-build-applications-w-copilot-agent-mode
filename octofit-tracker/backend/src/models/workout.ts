import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    focus: { type: String, trim: true },
  },
  { timestamps: true },
);

const Workout = model('Workout', workoutSchema);

export default Workout;
