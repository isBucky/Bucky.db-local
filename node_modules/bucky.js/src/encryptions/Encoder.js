const { createCipheriv, scryptSync } = require('crypto');

module.exports = function Encoder(string, secret, callback) {
  if (!string || typeof string !== 'string') throw new TypeError('Please provide a valid value to encrypt!');
  if (!secret || typeof secret !== 'string') throw new TypeError('You didn\'t provide a secret password!');
  secret = scryptSync(secret, 'NBKRS', 32);
  
  let cipher = createCipheriv(
    'aes-256-ctr',
    secret.toString('hex').slice(0, 32),
    secret.toString('hex').slice(0, 16)
  );
  
  cipher = Buffer.concat([
    cipher.update(string, 'utf8'),
    cipher.final()
  ]);
  
  if (callback && typeof callback == 'function')
    return callback(cipher.toString('hex'));
  else return cipher.toString('hex');
};