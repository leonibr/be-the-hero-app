

const bcrypt = require('bcrypt');

module.exports =  {
    hash: async (passwordToHash) => {
        return await bcrypt.hash(passwordToHash, 10);
    },
    isPasswordValid: async (candidate, hashed) => {
        return await bcrypt.compare(candidate, hashed);
    }
}


