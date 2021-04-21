import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { jwtSecret, masterKey } from '../../config'
import * as facebookService from '../facebook'
import * as githubService from '../github'
import * as googleService from '../google'
import * as appleService from '../apple'
import * as vkService from '../vk'
import User, { Roles } from '../../models/user'
import * as userSchemas from '../../routes/users/validationSchema'

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.status(400).json(err)
    } else if (err || !user) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

export const facebook = () =>
  passport.authenticate('facebook', { session: false })

export const github = () =>
  passport.authenticate('github', { session: false })

export const google = () =>
  passport.authenticate('google', { session: false })

export const vk = () =>
  passport.authenticate('vk', { session: false })

export const apple = () =>
  passport.authenticate('apple', { session: false })

export const master = () =>
  passport.authenticate('master', { session: false })

export const token = ({ required, roles = Roles } = {}) => (req, res, next) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (err || (required && !user) || (required && !~roles.indexOf(user.role))) {
      return res.status(401).end()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.status(401).end()
      next()
    })
  })(req, res, next)

passport.use('password', new BasicStrategy((email, password, done) => {
  const validationResult = userSchemas.createUser.validate({ email, password })
  if (validationResult.error) {
    done(validationResult.error)
  }

  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      done(true)
      return null
    }
    return user.authenticate(password, user.password)
  }).then((user) => {
    done(null, user)
    return null
  }).catch((err) => {
    console.log(err)
    done(err)
  })
}))

passport.use('facebook', new BearerStrategy((token, done) => {
  facebookService.getUser(token).then((user) => {
    return User.createWithSocialNetwork({ type: 'facebook', ...user })
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))

passport.use('github', new BearerStrategy((token, done) => {
  githubService.getUser(token).then((user) => {
    return User.createWithSocialNetwork({ type: 'github', ...user })
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))

passport.use('google', new BearerStrategy((token, done) => {
  googleService.getUser(token).then((user) => {
    return User.createWithSocialNetwork({ type: 'google', ...user })
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))

passport.use('apple', new BearerStrategy((token, done) => {
  appleService.getUser(token).then((user) => {
    return User.createWithSocialNetwork({ type: 'apple', ...user })
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))

passport.use('vk', new BearerStrategy((token, done) => {
  vkService.getUser(token).then((user) => {
    return User.createWithSocialNetwork({ type: 'vk', ...user })
  }).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))

passport.use('master', new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {})
  } else {
    done(null, false)
  }
}))

passport.use('token', new JwtStrategy({
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }, done) => {
  User.findByPk(id).then((user) => {
    done(null, user)
    return null
  }).catch(done)
}))
