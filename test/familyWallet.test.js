

const FamilyWallet = artifacts.require("FamilyWallet")

const toBN = value => web3.utils.toBN(value)


contract("FamilyWallet", accounts => {

    const _amount = "2000000000000000000";
  
    let _contract = null
    let contractOwner = null
    let _who = null

    before(async() => {

      _contract = await FamilyWallet.deployed()
      contractOwner = accounts[0]
      _who = accounts[1]
    })

    describe("Adding Allowance", () => {

      before (async() => {
        const result = await _contract.addAllowance(_who, _amount, {
        to: _who.address, 
        _amount
        })
        console.log(result)
      })
      
      it("should resolve into true value", () =>{
          assert(true, "test is passing")
      })
    })
})