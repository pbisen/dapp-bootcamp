const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

 const EVM_REVERT = 'VM Exception while processing transaction: revert'

 const ether = (n) => {
  return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
  )
}

// Same as ether
 const tokens = (n) => ether(n)

module.export = {
  ETHER_ADDRESS: ETHER_ADDRESS,
  EVM_REVERT: EVM_REVERT,
  ether : ether,
  tokens: tokens
};