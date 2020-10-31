// // keys.js: Figure out what set of credentials to return
// if (process.env.NODE_ENV === 'production') {
//     // we are in production - return the prod set of keys
//     module.exports = require('./prod');
// } else {
//     // we are in development - return the dev set of keys
//     module.exports = require('./dev');
// }

// dev.js: Don't commit this!!!
module.exports = {
    mongoURI: 'mongodb+srv://zongpol:zongpolPassword@cluster0.46aac.mongodb.net/cluster0?retryWrites=true&w=majority',
    secretOrKey: 'fadsfdsagsdhhj',
};