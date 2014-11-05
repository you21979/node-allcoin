var allcoin = require('..');
var api = allcoin.PublicApi;

api.depth('mona_btc').then(console.log);
