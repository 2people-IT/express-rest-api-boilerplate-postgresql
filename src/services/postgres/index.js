import Sequelize from 'sequelize'

import { db } from '../../config'

export const sequelize = new Sequelize(db.connString)
