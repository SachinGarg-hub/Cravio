require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import models
const User = require('../models/user.model');
const FoodPartner = require('../models/foodpartner.model');
const Food = require('../models/food.model');
const connectDB = require('./db');

async function seedDatabase() {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await FoodPartner.deleteMany({});
        await Food.deleteMany({});

        // Create dummy users
        console.log('Creating dummy users...');
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        const users = await User.insertMany([
            {
                fullName: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword
            },
            {
                fullName: 'Jane Smith',
                email: 'jane@example.com',
                password: hashedPassword
            }
        ]);

        // Create dummy food partners
        console.log('Creating dummy food partners...');
        const partners = await FoodPartner.insertMany([
            {
                name: 'Burger King',
                contactName: 'Manager BK',
                phone: '1234567890',
                address: '123 Fast Food St',
                email: 'bk@example.com',
                password: hashedPassword
            },
            {
                name: 'Pizza Hut',
                contactName: 'Manager PH',
                phone: '0987654321',
                address: '456 Pizza Ave',
                email: 'ph@example.com',
                password: hashedPassword
            }
        ]);

        // Create dummy food items
        console.log('Creating dummy food items...');
        await Food.insertMany([
            {
                name: 'Whopper',
                video: 'https://example.com/whopper-video.mp4',
                description: 'A delicious flame-grilled beef burger',
                foodPartner: partners[0]._id,
                likeCount: 150,
                savesCount: 20
            },
            {
                name: 'Pepperoni Pizza',
                video: 'https://example.com/pizza-video.mp4',
                description: 'Classic pepperoni pizza with extra cheese',
                foodPartner: partners[1]._id,
                likeCount: 320,
                savesCount: 45
            },
            {
                name: 'Fries',
                video: 'https://example.com/fries-video.mp4',
                description: 'Crispy golden fries',
                foodPartner: partners[0]._id,
                likeCount: 89,
                savesCount: 10
            }
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
}

seedDatabase();
