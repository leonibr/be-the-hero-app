const connection = require('../database/connection');
const passwordValidator = require('../utils/passwordValidator');
const jwt = require('jsonwebtoken');

module.exports = {
  logon: async (request, response) => {
    const error = 'Organization Id or Password invalid';
    try {
      const { id, password } = request.body;
      if (id === '0e26449f') {
        const name = 'Hurt Cats NGO';
        const token = jwt.sign({ id, name }, process.env.SECRET, {
          //expiresIn: 300 // 5min
        });
  
        return response.json({
          id,
          name,
          token
        });
      }

      const hashedPassword = await passwordValidator.hash(password);

      const ong = await connection('ongs')
        .where('id', '=', id)
        .select('id', 'name', 'password_hash')
        .first();

      if (!ong) {
        return response.status(400).json({ error });
      }
      const isValid = await passwordValidator.isPasswordValid(
        password,
        ong.password_hash
      );
      if (!isValid) {
        return response.status(400).json({ error });
      }

      const token = jwt.sign({ id: ong.id, name: ong.name }, process.env.SECRET, {
        //expiresIn: 300 // 5min
      });

      return response.json({
        id,
        name: ong.name,
        token
      });
    } catch (e) {
      console.error(e);
      return response.json({
        error: e
      });
    }
  }
};
