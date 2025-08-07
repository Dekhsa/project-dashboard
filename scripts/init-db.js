// Firebase Database Initialization Script
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { db } = require('../config/firebase');
const fs = require('fs');

async function initializeDatabase() {
  try {
    console.log('Initializing Firebase database...');
    
    // Read the initial data
    const initialData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'firebase-initial-data.json'), 'utf8'));
    
    // Set the data in Firebase
    await db.ref().set(initialData);
    
    console.log('✅ Database initialized successfully!');
    console.log('Initial data has been uploaded to Firebase Realtime Database');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
