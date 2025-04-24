const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Transaction = require('../../transaction/transaction.model');
const Creator = sequelize.define('Creator', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  payout_account_id: {
    type: DataTypes.STRING
  },
  total_earned: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.00
  },
  total_paid_out: {
    type: DataTypes.DECIMAL,
    defaultValue: 0.00
  }
}, {
  timestamps: true
});

// Creator.hasMany(Transaction, {
//     foreignKey: 'creator_id',
//     as: 'transactions'
// });

module.exports = Creator;
