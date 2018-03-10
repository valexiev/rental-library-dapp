import Web3 from 'web3'

var web3Custom

if (typeof web3 !== 'undefined') {
  // web3 is available
  this.hasMM = true
  web3Custom = new Web3(web3.currentProvider)
} else {
  // web3 is NOT available
  web3Custom = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

export default web3Custom
