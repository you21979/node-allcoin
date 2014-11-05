"use strict";
var crypto = require('crypto');
var querystring = require('querystring');
var constant = require('./constant');
var lp = require('./req_private').lp;

var createSign = function(argo, key, post){
    var postClone = JSON.parse(JSON.stringify(post));
    postClone['secret_key'] = key;
    postClone = Object.keys(postClone).
        sort().
        reduce(function(r,v){r[v] = postClone[v];return r},{});
    var qstring = querystring.stringify(postClone);

    return crypto.createHash(argo).
        update(new Buffer(qstring)).
        digest('hex').toString().toLowerCase();
};
var createHeader = function(api_key, secret_key, user_agent, postdata){
    var qstring = querystring.stringify(postdata);
    return {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': qstring.length,
        'User-Agent': user_agent,
    };
}
var createPostParam = function(objarray){
    var postparams = {};
    objarray.forEach(function(obj){
        Object.keys(obj).forEach(function(key){ postparams[key] = obj[key]; });
    });
    return postparams;
}
var createPostOption = function(url, api_key, secret_key, user_agent, nonce, method, params){
    var post = createPostParam([{method:method, access_key:api_key, created:nonce}, params]);
    post['sign'] = createSign('md5', secret_key, post);
    return {
        url: url,
        method: 'POST',
        form: post,
        headers: createHeader(api_key, secret_key, user_agent, post),
    };
}
var createPrivateApi = module.exports = function(api_key, secret_key, user_agent, nonce_func){
    var url = function(){ return constant.ALLCOIN_AUTH_URL + '/' };
    var initnonce = new Date()/1000|0;
    nonce_func = nonce_func || function(){ return initnonce++; }
    var query = function(method, params){
        return lp.req(createPostOption(url(), api_key, secret_key, user_agent, nonce_func(), method, params)).
        then(JSON.parse).then(function(v){            
            if(v.code > 0) return v.data;
            else throw(new Error(v.error_info));
        });
    };
    var query_method = function(method){ return function(opt){
        var params = {};
        if(opt instanceof Object) Object.keys(opt).forEach(function(keys){ params[keys] = opt[keys] });
        return query(method, params) };
    };
    return {
        query : query,

        // balance
        getInfo : function(){ return query('getinfo', {}) },

        // wallet
        myDeposits : function(){ return query('mydeposits', {}) },
        depositAddress : function(type){ return query('deposit_address', {type:type.toUpperCase()}) },
        myWithdraws : function(){ return query('mywithdraws', {}) },
        withdraws : function(address, amount, type){
            return query('withdraw', {
                address : address,
                amount : amount,
                type : type.toUpperCase(),
            })
        },

        // trade
        sellCoin : function(exchange, num, price, type){
            return query('sell_coin', {
                exchange : exchange,
                num : num,
                price : price,
                type : type.toUpperCase(),
            })
        },
        buyCoin : function(exchange, num, price, type){
            return query('buy_coin', {
                exchange : exchange,
                num : num,
                price : price,
                type : type.toUpperCase(),
            })
        },
        cancelOrder : function(order_id){
            return query('cancel_order', {
                order_id : order_id,
            })
        },
        myOrders : function(){
            return query('myorders', {})
        },
        myTrades : function(page, page_size, opt){
            var params = {
                page:page || 1,
                page_size:page_size || 20
            }
            if(opt instanceof Object) Object.keys(opt).forEach(function(keys){ params[keys] = opt[keys] });
            return query('mytrades', params)
        },
    };
}
