const generateUniqueId = require('../utils/generateUniqueId');
const passwordValidator = require('../utils/passwordValidator');

const connection = require('../database/connection');
const crypto = require('crypto');
module.exports = {
  index: async (_, response) => {
    const ongs = await connection('ongs').select('*');
    return response.status(200).json(ongs);
  },
  create: async (request, response) => {
    const { name, email, whatsapp, city, uf, password } = request.body;
    const id = generateUniqueId();
    const password_hash = await passwordValidator.hash(password);
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
      password_hash
    });
    return response.status(201).json({ id });
  }
};
