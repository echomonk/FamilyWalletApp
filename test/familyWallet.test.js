

const FamilyWallet = artifacts.require("FamilyWallet")
const { catchRevert } = require("./utils/exceptions")

const toBN = _amount => web3.utils.toBN(_amount)


contract("FamilyWallet", accounts => {

    const _amount = "2000000000000000000";

    let _contract = null
    let contractOwner = null
    let _who = null
    let message = null
    let keyword = null

    before(async() => {
      _contract = await FamilyWallet.deployed()
      contractOwner = accounts[0]
      _who = accounts[1]
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
          message,
          keyword
        }, function (err, hash){
          if(!err)
          txHash = hash
          console.log(txHash)
        })
      })
    })

    
})
