const connection = require('../database/connection');

module.exports = {
  index: async (request, response) => {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    const ongs = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    const total = response.header('X-Total-Count', count['count(*)']);
    return response.status(200).json(ongs);
  },
  create: async (request, response) => {
    const { title, description, value } = request.body;
    const ong_id = request.ongId;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });
    return response.status(201).json({ id });
  },
  delete: async (request, response) => {
    const { id } = request.params;
    const ong_id = request.ongId;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if(!incident) {
      return response.status(404).json({
        error: 'Ong not found'
      })
    }
    if (incident.ong_id !== ong_id) {
      return response.status(403).json({
        error: 'Operation not permitted.'
      });
    }

    await connection('incidents')
      .where('id', id)
      .delete();

    return response.status(204).send();
  }
};
