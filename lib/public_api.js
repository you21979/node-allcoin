"use strict";
var lp = require('./req_public').lp;
var constant = require('./constant');
var makeapi = function(api){
    return constant.ALLCOIN_APIV2_URL + '/' + api;
}
var createEndPoint = function(api, pair){
    return api + '/' + pair.toUpperCase();
}

var query = exports.query = function(method, pair){
    return lp.req(createEndPoint(makeapi(method), pair)).
        then(JSON.parse).
        then(function(v){
            if(v.code > 0) return v.data;
            else throw new Error(v.error_info);
        })
}

exports.pairs = function(){
    return query('pairs', '');
}

exports.pair = function(pair){
    return query('pair', pair);
}

exports.depth = function(pair){
    return query('depth', pair);
}

exports.trade = function(pair){
    return query('trade', pair);
}

