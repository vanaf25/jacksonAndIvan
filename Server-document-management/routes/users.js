const mongoose = require('mongoose');
const Joi = require('joi');
const router = require('express').Router();

const utils = require('../lib/utils');
const auth = require('./middleware/auth');

const User = mongoose.model('User');

router.post('/signin', function (req, res, next) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          error: 'could not find user',
        });
      }

      const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = utils.issueJWT(user);

        res.status(200).json({
          token: tokenObject.token,
        });
      } else {
        res.status(401).json({
          error: 'Invalid email or password...',
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/signup', async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    role: Joi.string().required(),
    status: Joi.string().allow('', null).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password, role, status } = req.body;

  // Check out if the user already exists or not
  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already exists...');

  // Generate Password
  const saltHash = utils.genPassword(password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    email,
    role,
    status,
    hash,
    salt,
  });

  newUser
    .save()
    .then((user) => {
      const jwt = utils.issueJWT(user);

      res.status(200).json({
        token: jwt.token,
      });
    })
    .catch((err) => next(err));
});

router.get('/users', auth, async (req, res, next) => {
  try {
    // if (req.user.role !== 'admin') return res.status(401).send('Permission denied...');

    const Users = await User.find({}, { email: 1, role: 1, status: 1 });
    res.send(Users);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

router.patch('/users/:id', auth, async (req, res) => {
  try {
    // if (req.user.role !== 'admin') return res.status(401).send('Permission denied...');

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found...');

    await User.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      },
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

router.delete('/users/:id', auth, async (req, res) => {
  try {
    // if (req.user.role !== 'admin') return res.status(401).send('Permission denied...');

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found...');

    await User.findByIdAndDelete(req.params.id);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});

module.exports = router;
