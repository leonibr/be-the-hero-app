const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){
    
    const authorization = req.headers['authorization'];
    

    if (!authorization) return res.status(401).send({ error: 'No token provided.' });

    const token = authorization.toString().replace('Bearer ', '');

    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

  


  module.exports = authMiddleware;