'use strict';

module.exports = function (Shift) {
  Shift.observe('before save', async function (ctx, next) {
    const token = ctx.options && ctx.options.accessToken;
    const userId = token && token.userId;
    ctx.instance.$userId = userId
    next();
  });


};
