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
     DOGE: '10.0',
     MONA: '100.0',
     KUMA: '1000.0' },
  balance_hold: { BTC: 0.0, KUMA: 0.0 },
  servertimestamp: 1415221187 }
```

myDeposits()
```
api.myDeposits().then(console.log);
[{
    "id": "1414405",
    "user_id": "100000",
    "coin_type": "DOGE",
    "address": "DH6SrG4ALmm2RatdWiTxwFD5GzzweoxgLM",
    "txid": "cf5d0540de5fb296bf300c4599aaf28976977cdf8834a9d2f7860389c2b0333c",
    "amount": "100.00000000",
    "confirmations": "26",
    "ctime": "2014-06-15 07:11:07", //create time
    "uptime": "2014-06-15 07:39:43", //update time
    "add_account_time": "2014-06-15 07:13:03", // add amount to your account time
    "status": "1" //0: pending 1: deposit success
}]

```

depositAddress(type)
```
api.depositAddress('doge').then(console.log);
{
    "DOGE": "D9Di5gsbDVhZ4CT3j9mLopWnbPkKjNdbsn"
}
```

myWithdraws()
```
api.myWithdraws().then(console.log);
[{
    "id": "321665",
    "user_id": "100000",
    "coin_type": "DOGE",
    "amount": "100.00000000",
    "pay_amount": "99.80000000",
    "address": "DTwwuapaP3Qx15nq4Cwxhkphri3kXm71TD",
    "ctime": "2014-06-15 07:16:43",
    "uptime": "2014-06-15 07:23:01",
    "txid": "845797b5ec786f3f3bc59d07133516b632b0c9e78727bf6bedb3aca914922f4c",
    "status": "3" //0: email confirm required 1: email confirmed 3: we've send out
}]
```

withdraws(address, amount, type)
```
api.withdraws('DTwwuapaP3Qx15nq4Cwxhkphri3kXm71TD', 10, 'doge').then(console.log);
{
    withdraw_id": 1000
}
```

buyCoin(base, amount, price, counter)
```
api.buyCoin('btc', 1, 0.000001, 'mona').then(console.log);
{ order_id: 1 }
```

sellCoin(base, amount, price, counter)
```
api.sellCoin('btc', 1, 0.1, 'mona').then(console.log);
{ order_id: 2 }
```

cancelorder(order_id)
```
api.cancelOrder(1).then(console.log);
{ order_id: 1 }
```

myOrders()
```
api.myOrders().then(console.log);
[{
    "order_id": "1410027",
    "user_id": "100000",
    "type": "DOGE",
    "exchange": "BTC",
    "ctime": "2014-06-15 14:42:36",
    "price": "0.00000060",
    "num": "1000.00000000",
    "total": "0.00060000", 
    "rest_num": "1000.00000000", // the remaining DOGE of the order
    "rest_total": "0.00060000", //the remaining BTC of the order
    "fee": "0.00000090", // about fees, please visit here https://www.allcoin.com/pub/fee
    "order_type": "sell"
}]
```

myTrades(page, page_size, opt)
```
api.myTrades().then(console.log);
[{
    "trade_id": "100000",
    "type": "HIC",
    "exchange": "BTC",
    "ctime": "2014-06-01 09:03:42",
    "price": "0.00001849",
    "num": "11.12000000",
    "total": "0.00020561",
    "fee": "0.016680",
    "order_id": "139978",
    "trade_type": "buy"
}]
```


License
-------

MIT License

Donate
------
bitcoin:1GLnWVBpadWnHpxf8KpXTQdwMdHAWtzNEw  
monacoin:MCEp2NWSFc352uaDc6nQYv45qUChnKRsKK  

