//metamaskのweb3(v0.2)のprividerとappのweb3(v1.0)のproviderをつなげる
import Web3 from 'web3';

//window.web3 is copy of web3 coming from metamask library
const web3 = new Web3(window.web3.currentProvider);

export default web3;
