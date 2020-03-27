const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection');
const crypto = require('crypto');
module.exports = {
    index : async (_, response) => {
        const ongs = await connection('ongs').select('*');
        return response.status(200).json(ongs);
    },
    create : async (request, response) => {
        const {
            name, email, whatsapp, city, uf
        } = request.body;
        const id = generateUniqueId();
        await connection('ongs')
            .insert({
                id, name, email, whatsapp, city, uf
            });
        return response.status(201).json({ id });
    }
}