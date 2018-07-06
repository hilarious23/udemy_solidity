const routes = require('next-routes')();

routes
//  Aのとき、Bを表示。new設定しないとnewとaddress勘違いする
  .add('/campaigns/new', '/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests', '/campaigns/requests/index');

module.exports = routes;
