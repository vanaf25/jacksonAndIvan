const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');

require('dotenv').config();

const pathToKey = path.join(__dirname, '../..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. Not authorized...');

  try {
    const decoded = jsonwebtoken.verify(token, PUB_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid auth token...');
  }
}

module.exports = auth;
