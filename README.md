node-allcoin
============

allcoin is altcoin exchange market.  
You can be automated trading using this module.  

install
-------

```
npm install allcoin
```

api document
------------
https://www.allcoin.com/pub/api

Public API
----------

module prepare
```
var allcoin = require('allcoin');
var api = allcoin.PublicApi;
```

pairs()
```
api.pairs().then(console.log)
{ AIDEN_BTC: 
   { min_24h_price: '0.00000081',
     max_24h_price: '0.00000081',
     trade_price: '0.00000081',
     volume_24h_AIDEN: '',
     volume_24h_BTC: '',
     avg_24h: '0',
     change_24h: '0.0000',
     type: 'AIDEN',
     exchange: 'BTC',
     type_volume: '',
     exchange_volume: '',
     top_bid: '0.00000081',
     top_ask: '0.00000159',
     name: 'ADN',
     status: '1',
     wallet_status: '1' },
  ZS_BTC: 
   { volume_24h_ZS: '',
     volume_24h_BTC: '',
     avg_24h: '0',
     change_24h: '0.0000',
     min_24h_price: '0.00000069',
     max_24h_price: '0.00000111',
     trade_price: '0.00000111',
     type: 'ZS',
     exchange: 'BTC',
     type_volume: '',
     exchange_volume: '',
     top_bid: '0.00000070',
     top_ask: '0.00000130',
     name: 'Zimstake',
     status: '1',
     wallet_status: '1' } }

```

pair(pair)
```
api.pair('mona_jpy').then(console.log)
{ min_24h_price: '0.00013970',
  min_24h_time: '1415216916',
  max_24h_price: '0.00015000',
  max_24h_time: '1415179665',
  trade_price: '0.00013971',
  change_24h: '0.1029',
  volume_24h_MONA: '48812.73648873',
  volume_24h_BTC: '6.50426151',
  avg_24h: '0.00013325',
  type: 'MONA',
  exchange: 'BTC',
  type_volume: '48812.73648873',
  exchange_volume: '6.50426151',
  top_bid: '0.00013971',
  top_ask: '0.00014800',
  name: 'MONA',
  status: '1',
  wallet_status: '1' }
```

depth(pair)
```
api.depth('mona_btc').then(console.log)
{ sell: 
   { '0.00014800': 30,
     '0.00014999': 39.67821661,
     '0.00015540': 10,
     '0.00015810': 6.7868985,
     '0.10000000': 15,
     '0.79999999': 111,
     '1.00000000': 12 },
  buy: 
   { '0.00013971': 546.74305228,
     '0.00013970': 1787.01237641,
     '0.00013001': 492,
     '0.00005100': 500,
     '0.00004500': 1000,
     '0.00004000': 1000 } }
```

trade(pair)
```
api.trade('mona_jpy').then(console.log)
[ { time: '2014-11-05 20:58:32',
    price: '0.00013971',
    num: '400.00300000',
    total: '0.05588442' },
  { time: '2014-11-05 20:31:43',
    price: '0.00013971',
    num: '1.35170500',
    total: '0.00018885' },
  { time: '2014-11-05 12:58:27',
    price: '0.00014020',
    num: '6.95793023',
    total: '0.00097550' } ]
```


Private API
-----------

edit config.json
```
{
 "apikey" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 "secretkey" : "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
}
```

module prepare
```
var allcoin = require('allcoin');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('./config.json').then(JSON.parse).
then(function(config){
    var api = allcoin.createPrivateApi(config.apikey, config.secretkey, 'user agent is node-allcoin');
    // call api
}).catch(console.log);
```

getinfo()
```
api.getInfo().then(console.log);
{ balances_available: 
   { BTC: '1.0',
     LTC: '10.0',
     MONA: '100.0',
     KUMA: '1000.0' },
  balance_hold: { BTC: 0.0, KUMA: 0.0 },
  servertimestamp: 1415221187 }
```

trade(pair, 'bid' or 'ask', price, amount)
```
api.trade('mona_jpy', 'bid', 5, 10000).then(console.log);
{ received: 0,
  remains: 10000,
  order_id: 5999,
  funds: { jpy: 50000, btc: 0, mona: 0 } }
```

activeorders()
```
api.activeOrders().then(console.log);
{ '5999':
   { currency_pair: 'mona_jpy',
     action: 'bid',
     amount: 10000,
     price: 5,
     timestamp: '1410279064' } }
```

cancelorder(order_id)
```
api.cancelOrder(5999).then(console.log);
{ order_id: 5999,
  funds: { jpy: 100000, btc: 0, mona: 0 } }
```

License
-------

MIT License

Donate
------
bitcoin:1GLnWVBpadWnHpxf8KpXTQdwMdHAWtzNEw  
monacoin:MCEp2NWSFc352uaDc6nQYv45qUChnKRsKK  

