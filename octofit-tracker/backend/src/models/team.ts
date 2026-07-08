import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    members: { type: Number, default: 0 },
    captain: { type: String, trim: true },
  },
  { timestamps: true },
);

const Team = model('Team', teamSchema);

export default Team;
