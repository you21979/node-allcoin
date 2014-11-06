var allcoin = require('..');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var target = 'btc';

/* config.json
{
 "apikey" : "",
 "secretkey" : "",
 "address" : {
  "btc" : "1xxxxxxxxxx",
  "mona" : "Mxxxxxxxxxxxx"
 }
}
*/
fs.readFileAsync('./config.json').then(JSON.parse).
then(function(config){
    var api = allcoin.createPrivateApi(config.apikey, config.secretkey, 'tradebot');
    return api.withdraws(config.address[target], 0.01, target).then(console.log);
}).catch(console.log);


