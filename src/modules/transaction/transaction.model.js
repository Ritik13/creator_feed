const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Creator = require('../creator/model/creator.model');

const Transaction = sequelize.define('Transaction', {
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
  source: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  tableName: 'transactions'
});

// Transaction.belongsTo(Creator, {
//     foreignKey: 'creator_id',
//     as: 'creator'
// });


module.exports = Transaction;
