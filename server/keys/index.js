const fs = require('fs');

module.exports = {
    key: fs.readFileSync('./keys/jwtRS256.key'),
    keyPub: fs.readFileSync('./keys/jwtRS256.key.pub'),
}
