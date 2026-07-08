import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Mina Chen',
        email: 'mina.chen@example.com',
        fitnessGoal: 'Train for a half marathon',
        experienceLevel: 'Intermediate',
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        fitnessGoal: 'Build strength and endurance',
        experienceLevel: 'Advanced',
      },
      {
        name: 'Avery Brooks',
        email: 'avery.brooks@example.com',
        fitnessGoal: 'Improve mobility and recovery',
        experienceLevel: 'Beginner',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'River Runners',
        sport: 'Running',
        members: 6,
        captain: users[0].name,
      },
      {
        name: 'Peak Movers',
        sport: 'CrossFit',
        members: 8,
        captain: users[1].name,
      },
    ]);

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 42,
        completedAt: new Date('2026-07-08T06:30:00.000Z'),
      },
      {
        userId: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 55,
        completedAt: new Date('2026-07-07T18:20:00.000Z'),
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        completedAt: new Date('2026-07-06T07:10:00.000Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        score: 980,
        streak: 7,
        rank: 1,
      },
      {
        userId: users[1]._id,
        score: 915,
        streak: 5,
        rank: 2,
      },
      {
        userId: users[2]._id,
        score: 842,
        streak: 3,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Morning Mobility',
        difficulty: 'Beginner',
        durationMinutes: 20,
        focus: 'Flexibility',
      },
      {
        title: 'Tempo Intervals',
        difficulty: 'Intermediate',
        durationMinutes: 30,
        focus: 'Cardio',
      },
      {
        title: 'Power Circuit',
        difficulty: 'Advanced',
        durationMinutes: 45,
        focus: 'Strength',
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, and workout plans`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
