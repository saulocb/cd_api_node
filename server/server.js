// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
const loopback = require('loopback');
const boot = require('loopback-boot');
var cors = require('cors')


var corsOptions = {
  origin: 'https://studying-react.vercel.app/home'
}

const app = module.exports = loopback();
// app.use(cors())

// app.get('*', cors(),  function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })


app.use(cors(corsOptions),  function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://studying-react.vercel.app/home');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
})



app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
