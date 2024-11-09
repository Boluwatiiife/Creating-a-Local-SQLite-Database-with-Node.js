const sdlite3 = require('sqlite3').verbose()
let db = new sdlite3.Database('./db/user.db');
module.exports = db;