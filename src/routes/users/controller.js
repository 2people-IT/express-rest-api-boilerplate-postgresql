import User from '../../models/user'
import * as mail from '../../services/mail'

export async function createUser (req, res, next) {
  try {
    const user = await User.createWithEmail(req.body)
    await mail.sendPassword({ to: req.body.email, password: req.body.password })

    return res.json({
      user: user.view({ full: true })
    })
  } catch (err) {
    return next(err)
  }
}
export async function deleteUser (req, res, next) {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(400).json({ error: true, message: 'Invalid :id parameter' })
    }

    await user.destroy()

    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
export async function getMe (req, res, next) {
  try {
    return res.json({
      user: req.user.view({ full: true })
    })
  } catch (err) {
    return next(err)
  }
}
export async function getUser (req, res, next) {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(400).json({ error: true, message: 'Invalid :id parameter' })
    }

    return res.json({
      user: user.view({})
    })
  } catch (err) {
    return next(err)
  }
}
export async function getUsers (req, res, next) {
  try {
    const [count, users] = await Promise.all([
      User.count({
        where: req.query.where
      }),
      User.findAll({
        attributes: req.query.attributes,
        where: req.query.where,
        limit: req.query.limit,
        offset: req.query.offset
      })
    ])

    return res.json({
      rows: users.map((user) => user.view({ full: true })),
      count
    })
  } catch (err) {
    return next(err)
  }
}
export async function renderUsersInfo (req, res, next) {
  try {
    const [count, users] = await Promise.all([
      User.count({
        where: req.query.where
      }),
      User.findAll({
        attributes: req.query.attributes,
        where: req.query.where,
        limit: req.query.limit,
        offset: req.query.offset
      })
    ])

    return res.render('users', {
      title: 'Users',
      emailsVisible: true,
      users: users.map((user) => user.view({ full: true })),
      count
    })
  } catch (err) {
    return next(err)
  }
}
export async function updateUser (req, res, next) {
  try {
    let _user = req.user

    if (req.params.id !== 'me') {
      const isAdmin = _user.role === 'admin'

      if (!isAdmin || req.params.id.toString() !== _user.id.toString()) {
        return res.status(401).json({ error: true, message: 'You can\'t change other user\'s data' })
      }

      _user = await User.findByPk(req.params.id)

      if (!_user) {
        return res.status(400).json({ error: true, message: 'Invalid :id parameter' })
      }
    }

    _user.updateOne(req.body)

    return res.json({
      user: _user.view({ full: true })
    })
  } catch (err) {
    return next(err)
  }
}
export async function updateUserPassword (req, res, next) {
  try {
    const _user = await User.findByPk(req.params.id)

    if (!_user) {
      return res.status(400).json({ error: true, message: 'Invalid id parameter' })
    }

    if (req.user.id.toString() !== _user.id.toString()) {
      return res.status(401).json({ error: true, message: 'You can\'t change other user\'s password' })
    }

    await _user.updatePassword(req.body.password)

    if (req.user.email) {
      await mail.sendPassword({ to: req.user.email, password: req.body.password })
    }

    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
