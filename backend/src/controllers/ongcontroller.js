const connection = require('../database/connection');

module.exports = {
    index : async (_, response) => {
        const ongs = await connection('ongs').select('*');
        return response.status(200).json(ongs);
    },
    create : async (request, response) => {
        const {
            name, email, whatsapp, city, uf
        } = request.body;
        const id = crypto.randomBytes(10).toString('HEX');
        await connection('ongs')
            .insert({
                id, name, email, whatsapp, city, uf
            });
        return response.status(201).json({ id });
    }
}