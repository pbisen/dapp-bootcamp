export const tokens = (n)=> {
	return new web3.utils.BN(
		web3.utils.toWei(n.toString(), 'ether')
	)
	
}

export const EVM_REVERT = 'Returned error: VM Exception while processing transaction: revert'
export const EVM_INVADD_TRANSFER = 'invalid address (argument="address", value=0, code=INVALID_ARGUMENT, version=address/5.0.5) (argument="_to", value=0, code=INVALID_ARGUMENT, version=abi/5.0.7)';
export const EVM_INVADD_APPROVAL = 'invalid address (argument="address", value=0, code=INVALID_ARGUMENT, version=address/5.0.5) (argument="_spender", value=0, code=INVALID_ARGUMENT, version=abi/5.0.7)';