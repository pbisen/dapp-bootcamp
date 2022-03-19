require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
// const privateKeys = process.env.PRIVATE_KEYS || "";
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan:{
      provider: function(){
        return new HDWalletProvider(
          mnemonic,
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      network_id: 42,
      networkCheckTimeout:500000
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "^0.8",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
