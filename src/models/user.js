import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'
import { get } from 'lodash'
import { BadRequest } from 'yahel'

import { sequelize } from '../services/postgres'
import { env } from '../config'
import SocialNetwork from './social_network'

/* istanbul ignore next */
const HASH_ROUNDS = env === 'test' ? 1 : 9

export const Roles = ['user', 'admin']

class User extends Model {
  static async createWithEmail ({ email, password, name }) {
    try {
      const passwordHash = await bcrypt.hash(password, HASH_ROUNDS)
      const user = await User.create({ email, password_hash: passwordHash, name })
      return user
    } catch (err) {
      const code = get(err, ['original', 'code'])
      if (code === '23505') {
        throw new BadRequest('Email already in use')
      }
      throw err
    }
  }

  static async createWithSocialNetwork ({ type, id, email, name, picture }) {
    const transcation = await sequelize.transaction()
    try {
      const user = await User.create({ email, name, picture })
      await SocialNetwork.create({ id, type, user_id: user.id })
      await transcation.commit()
      return user
    } catch (err) {
      await transcation.rollback()
      throw err
    }
  }

  view ({ full = false } = { full: false }) {
    const view = {}
    let fields = ['id', 'name']

    if (full) {
      fields = [...fields, 'email', 'created_at']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  }

  async authenticate (password) {
    const valid = await bcrypt.compare(password, this.password_hash)
    return valid ? this : false
  }

  async updateOne (data) {
    Object.assign(this, data)
    await this.save()

    return this
  }

  async updatePassword (password) {
    this.password_hash = await bcrypt.hash(password, HASH_ROUNDS)
    await this.save()

    return this
  }
}

User.init({
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.ENUM(Roles),
    allowNull: false,
    defaultValue: 'user'
  },
  name: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING
  },
  password_hash: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['email']
    }
  ]
})

User.hasMany(SocialNetwork, { foreignKey: 'user_id', as: 'social_networks' })

export default User
