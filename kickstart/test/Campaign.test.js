const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  //lise of accounts。ganacheによりテスト用アカウント10個作成される。
  accounts = await web3.eth.getAccounts();

  //deploy factory
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000'});

  //functionを変更するときは.send 見るだけなら.call
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

  //[]tell js the thing that's being returned right here is going to be an array
    //take the first element out of that and assign it to the variable(campaignAddress)
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('marks caller as the campaign manager', async () => {
    //whenever we make a public variable inside of our contract a get methods is automatically created
      //I didn't make a method called manager, but this is automatically created for us because we had
      //marked the manage variable as being public
    const manager = await campaign.methods.manager().call();
    //accounts[0]がmanagerと一致しているか確認
    assert.equal(accounts[0], manager);
  });

  it('allows people to contribute money and marks them as approvers', async () => {
    await campaign.methods.contribute().send({
      value: '200',
      from: accounts[1]
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    //if isContributor is false, test fails
    assert(isContributor);
  });
});
