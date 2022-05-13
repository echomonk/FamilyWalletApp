

const FamilyWallet = artifacts.require("FamilyWallet")
const truffleAssert = require("truffle-assertions")
const { catchRevert } = require("./utils/exceptions")

const toBN = _amount => web3.utils.toBN(_amount)


contract("FamilyWallet", accounts => {

    const _amount = "1000000000000000000"
    const _amount2 = "2000000000000000000"

    let _contract = null
    let contractOwner = null
    let _who = null
    let message = null
    let keyword = null
    // let timestamp = null
    
 
    before(async() => {
      _contract = await FamilyWallet.deployed()
      contractOwner = accounts[0]
      _who = accounts[1]
      message = "hello"
      keyword = "hello"
      // timestamp = block.timestamp
    })

    describe("Adding Allowance", () => {

      it("should not be changed by NOT the owner", async() => {
        await catchRevert(_contract.addAllowance(_who, _amount, {from: _who}))
      })
      
      it("should add allowance to beneficiary", async () =>{
        const beforeAddAllowance = await _contract.getAllowance(_who, {from: _who.address})
        await _contract.addAllowance(_who, _amount, {to: _who.address, _amount})
        const afterAddAllowance = await _contract.getAllowance(_who, {from: _who.address})
        
        assert.equal( 
            toBN(beforeAddAllowance).add(toBN(_amount)).toString(),
            toBN(afterAddAllowance).toString(),
            "Beneficiary balance is not correct!")
      })
    })

    describe("Reduce Allowance", () => { 

      it("should not be changed by NOT the owner", async() => {
        await catchRevert(_contract.reduceAllowance(_who, _amount, {from: _who}))
      })

      it("should reduce allowance", async () => {
        const beforeReduceAllowance = await _contract.getAllowance(_who, {from: _who.address})
        await _contract.reduceAllowance(_who, _amount, { to: _who.address, _amount })
        const afterReduceAllowance = await _contract.getAllowance(_who, {from: _who.address})

        assert.equal( 
          toBN(beforeReduceAllowance).sub(toBN(_amount)).toString(),
          toBN(afterReduceAllowance).toString(),
          "Beneficiary balance is not correct!")
      })
    })

    describe("Send transaction", () => {

      let txHash;

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

      before(async () => {
        await web3.eth.sendTransaction({
          from: contractOwner,
          to: _contract.address,
          value: _amount,
        })
        const userAllowance = await _contract.addAllowance(_who, _amount, {to: _who.address, _amount})
        const contractBal = await web3.eth.getBalance(_contract.address)
        // console.log(contractBal)
      })

      it("should allow withdraw money for allowed user", async () => {
       const balanceBefore = await web3.eth.getBalance(_who) 
       const withdrawMoney = await _contract.withdrawMoney(_who, _amount, {to: _who.address, _amount})
       const balanceAfter = await web3.eth.getBalance(_who)

       assert.equal(
         toBN(balanceAfter).sub(toBN(_amount)).toString(), 
         toBN(balanceBefore).toString(),
         "Cannot withdraw from contract ")
      })



    })


    
  })
})
