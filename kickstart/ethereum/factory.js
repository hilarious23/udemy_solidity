import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9481542707c060f21dFA028b77B7D62bE703F2BD'
);

export default instance;
