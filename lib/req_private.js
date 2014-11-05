"use strict";
var LimitRequestPromise = require('limit-request-promise');
var constant = require('./constant');
var lp = exports.lp = new LimitRequestPromise(1,1);
lp.setup([
    {
        host:constant.ALLCOIN_AUTH_URL, max:10, sec:36,
    }
]);

