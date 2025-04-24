const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Payout = sequelize.define('Payout', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  creator_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0.00
  },
  method: {
    type: DataTypes.ENUM('upi', 'bank_transfer', 'stripe'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('success', 'failed', 'pending'),
    allowNull: false
  },
  reference_id :{
    type: DataTypes.STRING,
  }
}, {
  timestamps: true,
  tableName: 'payout'
});

// Transaction.belongsTo(Creator, {
//     foreignKey: 'creator_id',
//     as: 'creator'
// });


module.exports = Payout;
