const routes = require('next-routes')();

routes
//  Aのとき、Bを表示。new設定しないとnewとaddress勘違いする
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show');

module.exports = routes;
