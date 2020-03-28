const connection = require('../database/connection');
const passwordValidator = require('../utils/passwordValidator');
const jwt = require('jsonwebtoken');

module.exports = {
  //   create: async (request, response) => {
  //     const { id } = request.body;
  //     const ong = await connection('ongs')
  //       .where('id', id)
  //       .select('name')
  //       .first();
  //     if (!ong) {
  //       return response.status(400).json({ error: 'No ONG found with this id' });
  //     }

  //     return response.json(ong);
  //   },
  logon: async (request, response) => {
    const error = 'Organization Id or Password invalid';
    try {
      const { id, password } = request.body;

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

      var token = jwt.sign({ id: ong.id, name: ong.name }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });

      return response.json({
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
