

const FamilyWallet = artifacts.require("FamilyWallet")
const truffleAssert = require("truffle-assertions")
const { catchRevert } = require("./utils/exceptions")

const toBN = _amount => web3.utils.toBN(_amount)

const getGas = async result => {
  const tx = await web3.eth.getTransaction(result.tx)
  const gasUsed = toBN(result.receipt.gasUsed)
  const gasPrice = toBN(tx.gasPrice)
  const gas = gasUsed.mul(gasPrice)
  return gas
}

const getBalance = async address => web3.eth.getBalance(address)


contract("FamilyWallet", accounts => {

    const _amount = "100000000000000000"
    const _amount2 = "200000000000000000"
    
    let _contract = null
    let contractOwner = null
    let _who = null
    let unauthorized = null
    let message = null
    let keyword = null
    // let timestamp = null
    
    
    before(async() => {
      _contract = await FamilyWallet.deployed()
      contractOwner = accounts[0]
      _who = accounts[1]
      unauthorized = accounts[2]
      message = "hello"
      keyword = "hello"
      // timestamp = block.timestamp
    })


    describe("Add Allowance", () => {

      it("should NOT be changed by NOT the owner", async() => {
        await catchRevert(_contract.addAllowance(_who, _amount, {from: _who}))
      })
      
      it("should add allowance to beneficiary", async () =>{
        const beforeAddAllowance = await _contract.getAllowance(_who, {from: contractOwner})
        await _contract.addAllowance(_who, _amount, {from: contractOwner})
        const afterAddAllowance = await _contract.getAllowance(_who, {from: contractOwner})
        
        assert.equal( 
            toBN(beforeAddAllowance).add(toBN(_amount)).toString(),
            toBN(afterAddAllowance).toString(),
            "Beneficiary balance is not correct!")
      })
    })

    describe("Reduce Allowance", () => { 

      it("should NOT be changed by NOT the owner", async() => {
        await catchRevert(_contract.reduceAllowance(_who, _amount, {from: _who}))
      })

      it("should reduce allowance", async () => {
        const beforeReduceAllowance = await _contract.getAllowance(_who, {from: contractOwner})
        await _contract.reduceAllowance(_who, _amount, {from: contractOwner})
        const afterReduceAllowance = await _contract.getAllowance(_who, {from: contractOwner})

        assert.equal( 
          toBN(beforeReduceAllowance).sub(toBN(_amount)).toString(),
          toBN(afterReduceAllowance).toString(),
          "Beneficiary balance is not correct!")
      })
    })

    describe("Send transaction", () => {

      it("should get transaction receipt", async() => {
        await web3.eth.sendTransaction({
          from: contractOwner,
          to: _who.address,
          _amount,
        }, function (err, hash){
          if(!err) {
            txHash = hash
          } else {
            console.log(err)
          }
        })
      })
    })

    describe("Add to Blockchain", () => {
      
      it("should increment number of transactions", async() => {
        let txCount = null
        let expectedTxCount = 1
        await _contract.addToBlockchain(_who, _amount, message, keyword, {from: contractOwner})
        assert.equal(expectedTxCount, txCount += 1, "Transaction counts are not equal")
      })

      it("should add transfer to the struct", async() => {
        const txBlock = await _contract.addToBlockchain(_who, _amount, message, keyword, {from: contractOwner})
        const length = await _contract.getTransactionsLength.call()
      
        assert.equal(length, 2, "Array length is not correct")

        truffleAssert.eventEmitted(txBlock, 'Transfer', (ev) => {
          return ev.from === contractOwner &&
          ev.to === _who &&
          // ev.amount === toBN(_amount) &&
          // ev.timestamp === timestamp &&
          ev.message === message &&
          ev.keyword === keyword
        })
      })
    })

    describe("Get Transactions", () => {

      it("should get all transactions", async () => {
        const txs = await _contract.getAllTransactions.call()
        // console.log(txs)
      })

    })

    describe("Withdraw Money", () => {

      let txHash;
      let contractBal;
      let userAllowance;

      before(async () => {
        await web3.eth.sendTransaction({
          from: contractOwner,
          to: _contract.address,
          value: _amount,
        })
        const userAllowance = await _contract.addAllowance(_who, _amount, {from: contractOwner})
      })
      
      it("should allow withdraw money for allowed user", async () => {
       const balanceBefore = await getBalance(contractOwner)
       const result = await _contract.withdrawMoney(contractOwner, _amount, {from: contractOwner})
       const balanceAfter = await getBalance(contractOwner)
       const gas = await getGas(result)

       assert.equal(
         toBN(balanceAfter).sub(toBN(_amount)).add(gas).toString(), 
         toBN(balanceBefore),
         "Cannot withdraw from contract ")
      })

      it("should NOT allow to withdraw more than allowance", async () => {
        await catchRevert(_contract.withdrawMoney(contractOwner, _amount2, {from: contractOwner}))    
      })

      it("should NOT allow withdrawals by NOT authorized address", async () => {
        await catchRevert(_contract.withdrawMoney(unauthorized, _amount, {from: unauthorized}))
      })

    })

    describe("Emergency withdraw", () => {
      let currentOwner;

      before(async() => {
        currentOwner = await _contract.owner()
      })
    
      after(async () => {
        await _contract.resumeContract({from: currentOwner})
      })

      it("should fail when contract is NOT stopped", async () =>{
        await catchRevert(_contract.emergencyWithdraw({from: currentOwner}))
      })

      it("should have contract funds on contract owner", async () => {
        await _contract.stopContract({from: contractOwner})
  
        const contractBalance = await getBalance(_contract.address)
        const ownerBalance = await getBalance(currentOwner)
  
        const result = await _contract.emergencyWithdraw({from: currentOwner})
        const gas = await getGas(result)
  
        const newOwnerBalance = await getBalance(currentOwner)
  
        assert.equal(
          toBN(ownerBalance).add(toBN(contractBalance)).sub(gas),
          newOwnerBalance,
          "Owner does NOT have contract balance"
        )
      })

      it("should have contract balance of 0", async () => {
        const contractBalance = await getBalance(_contract.address)
  
        assert.equal(contractBalance, 0, "Contract does NOT have 0 balance")
      })

    })

    describe("Self Destruct", () => {
      let currentOwner;

      before(async() => {
        currentOwner = await _contract.owner()
      })

      it("should fail when contract is NOT stopped", async() => {
        await catchRevert(_contract.destroy({from: currentOwner}))
      })

      it("should have contract funds on contract owner", async () => {
        await _contract.stopContract({from: contractOwner})
  
        const contractBalance = await getBalance(_contract.address)
        const ownerBalance = await getBalance(currentOwner)
  
        const result = await _contract.destroy({from: currentOwner})
        const gas = await getGas(result)
  
        const newOwnerBalance = await getBalance(currentOwner)
  
        assert.equal(
          toBN(ownerBalance).add(toBN(contractBalance)).sub(gas),
          newOwnerBalance,
          "Owner does NOT have contract balance"
        )
      })

      it("should have contract balance of 0", async () => {
        const contractBalance = await getBalance(_contract.address)
  
        assert.equal(contractBalance, 0, "Contract does NOT have 0 balance")
      })
      
      it("should have 0x bytecode", async () => {
        const bytecode = await web3.eth.getCode(_contract.address)
  
        assert.equal(bytecode, "0x", "Contract is not destroyed")
      })
    })
})
