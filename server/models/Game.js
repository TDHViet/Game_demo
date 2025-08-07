import mongoose from 'mongoose'

const nameSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['EN', 'KO', 'JA'] // Updated to match the available languages
  },
  value: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\s]+$/.test(v) && v.trim().length >= 2
      },
      message: 'Name must contain only letters, numbers, and spaces, and be at least 2 characters long'
    }
  }
})

const gameSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Z0-9_]+$/.test(v) && v.length >= 2
      },
      message: 'ID must contain only uppercase letters, numbers, and underscores, and be at least 2 characters long'
    }
  },
  category: {
    type: String,
    required: true,
    enum: [
      'ADVENTURE',
      'ACTION', 
      'RPG',
      'SURVIVAL',
      'FPS',
      'BATTLE_ROYALE',
      'CREATIVE',
      'PLATFORMER',
      'SPORTS',
      'RACING',
      'SIMULATION'
    ]
  },
  name: {
    type: [nameSchema],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0
      },
      message: 'At least one name entry is required'
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
})

// Create indexes for better query performance
// Note: id index is automatically created due to unique: true
gameSchema.index({ category: 1 })
gameSchema.index({ 'name.language': 1 })

export default mongoose.model('Game', gameSchema) 