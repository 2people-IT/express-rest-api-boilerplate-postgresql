import Sequelize, { Model } from 'sequelize'

import { sequelize } from '../services/postgres'

export const TYPES = ['fb', 'google']

class SocialNetwork extends Model {
}

SocialNetwork.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  type: {
    type: Sequelize.ENUM(...TYPES),
    primaryKey: true
  },
  user_id: {
    type: Sequelize.BIGINT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'social_network',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['user_id']
    }
  ]
})

export default SocialNetwork
