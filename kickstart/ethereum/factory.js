import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x7138Fa3a8d3f2f26b88c80dE72D3450d11f2c110'
);

export default instance;
