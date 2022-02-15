import { tokens, EVM_REVERT, EVM_INVADD_TRANSFER, EVM_INVADD_APPROVAL } from './helpers';

const Token = artifacts.require('./Token');
//to fetch chai-as-promised
require('chai').use(require('chai-as-promised')).should()


contract('Token', (accounts) => {
	const name = 'Raman Token';
	const symbol = 'RAMAN';
	const decimals = '18';
	const totalSupply = tokens(1000000);
	let token;

	beforeEach(async () => {
		token = await Token.new();	
	})

	describe('deployment', () => {
		
		it('tracks the name', async () => {

			const result = await token.name();
			result.should.equal(name);

		})

		it('tracks the symbol', async () => {

			const result = await token.symbol();
			result.should.equal(symbol);

		})

		it('tracks the decimals', async () => {

			const result = await token.decimals();
			result.toString().should.equal(decimals);

		})

		it('tracks the total supply', async () => {

			const result = await token.totalSupply();
			result.toString().should.equal(totalSupply.toString());

		})

		it('assigns total supply to deployer', async () => {
			const result = await token.balanceOf(accounts[0]);
			result.toString().should.equal(totalSupply.toString());
		})


	})

	describe('working', () => {
		let amount, result;

		beforeEach(async() => {
			amount = tokens(100);
			result = await token.transfer(accounts[1], amount, {from: accounts[0]});
		})

		describe('success', async () => {
			it('checks for tokens being transferred', async () => {
				let tempBalance;
	
				tempBalance = await token.balanceOf(accounts[0]);
				tempBalance.toString().should.equal(tokens(999900).toString())
	
				tempBalance = await token.balanceOf(accounts[1]);
				tempBalance.toString().should.equal(tokens(100).toString())
				
			})
	
			it('emits a tranfer event', async () => {
				const log = result.logs[0];
				log.event.should.equal('Transfer');
				const events = log.args;
				events.from.toString().should.equal(accounts[0], 'from is correct')
				events.to.toString().should.equal(accounts[1].toString(), 'to is equal');
				events.value.toString().should.equal(amount.toString(), 'value is correct');
			})
		})

		describe('failure', async () => {

			it('rejects transfers when sendee has insufficient funds', async () => {
				let invalidAmount;
				invalidAmount = tokens(1000000000);	// 100 million : greater than toal supply
				await token.transfer(accounts[1], invalidAmount, {from: accounts[0]}).should.be.rejectedWith(EVM_REVERT);
				
				invalidAmount = tokens(1000);
				await token.transfer(accounts[0], invalidAmount, {from: accounts[1]}).should.be.rejectedWith(EVM_REVERT);
			})

			it('rejects invalid recipients', async () => {
				// this happens automatically now i guess
				await token.transfer(0x0, amount, {from: accounts[0]}).should.be.rejectedWith(EVM_INVADD_TRANSFER);
			})
 
		})	

		
	})

	//accounts[2] treated as exchange



	describe('approving tokens',() => {
		let result
		let amount

		beforeEach(async () => {
			amount = tokens(100)
			result = await token.approve(accounts[2], amount, {from: accounts[0]});

		})

		describe('success', () => {
			it('allocates an allowance for delegated token spending', async () => {
				const allowance = await token.allowance(accounts[0], accounts[2]);
				allowance.toString().should.equal(amount.toString());
			})

			it('checks is approval event is emitted', async () => {
				const log = result.logs[0];
				log.event.should.equal('Approval');
				const events = log.args;
				events.owner.toString().should.equal(accounts[0].toString(), 'owner is correct');
				events.spender.toString().should.equal(accounts[2].toString(), 'spender is correct');
				events.value.toString().should.equal(amount.toString(), 'amount is correct');
			})	
		})

		describe('failure', () => {
			
			it('checks for valid address', async () => {
				await token.approve(0x0, amount, {from :accounts[0]}).should.be.rejectedWith(EVM_INVADD_APPROVAL);
			})

			// it('checks if an unapproved access is allowed to spend', () => {
			// 	await token.transfer()
			// })
		})
	})

	describe('transfering approved tokens', async () => {
		let amount, result;
	
		beforeEach(async() => {
			amount = tokens(100);
			await token.approve(accounts[2], amount, {from: accounts[0]})
		})
	
		describe('success', async () => {
	
			beforeEach(async() => {
				result = await token.transferFrom(accounts[0],accounts[1], amount, {from: accounts[2]});
			})


			it('checks for tokens being transferred', async () => {
				let tempBalance;
	
				tempBalance = await token.balanceOf(accounts[0]);
				tempBalance.toString().should.equal(tokens(999900).toString())
	
				tempBalance = await token.balanceOf(accounts[1]);
				tempBalance.toString().should.equal(tokens(100).toString())
				
			})

			it('checks if allowance decreases after transfer', async () => {
				const allowance = await token.allowance(accounts[0], accounts[2]);
				allowance.toString().should.equal('0');
			})
	
			it('emits a tranfer event', async () => {
				const log = result.logs[0];
				log.event.should.equal('Transfer');
				const events = log.args;
				events.from.toString().should.equal(accounts[0], 'from is correct')
				events.to.toString().should.equal(accounts[1].toString(), 'to is equal');
				events.value.toString().should.equal(amount.toString(), 'value is correct');
			})
		})
	
		describe('failure', async () => {
	
			it('rejects transfers when sendee has insufficient funds', async () => {
				let invalidAmount;
				invalidAmount = tokens(1000000000);	// 100 million : greater than toal supply
				await token.transfer(accounts[1], invalidAmount, {from: accounts[0]}).should.be.rejectedWith(EVM_REVERT);
				
				invalidAmount = tokens(1000);
				await token.transfer(accounts[0], invalidAmount, {from: accounts[1]}).should.be.rejectedWith(EVM_REVERT);
			})
	
			it('rejects invalid recipients', async () => {
				// this happens automatically now i guess
				await token.transfer(0x0, amount, {from: accounts[0]}).should.be.rejectedWith(EVM_INVADD_TRANSFER);
			})
	
		})	
	
		
	})

})

