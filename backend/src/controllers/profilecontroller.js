const connection = require('../database/connection');

module.exports = {
  index: async (request, response) => {
    const ong_id = request.ongId;
    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    return response.json(incidents);
  }
};
