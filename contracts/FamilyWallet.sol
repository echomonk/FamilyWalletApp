//SPDX-License-Identifier: MIT

pragma solidity >= 0.7.0 < 0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FamilyWallet is Ownable {

    using SafeMath for uint;

    uint256 transactionCount;
    bool public isStopped = false;

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    mapping(address => uint) public allowance;

    modifier ownerOrAllowed(uint _amount) {
        require(isOwner() || allowance[msg.sender] >= _amount, "You are not allowed!");
        _;
    }

    modifier onlyWhenNotStopped {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    event AllowanceChanged(address indexed _forWho, address indexed _byWhom, uint _oldAmount, uint _newAmount);
    event MoneySent (address indexed _beneficiary, uint _amount);
    event MoneyReceived (address indexed _from, uint _amount);
    event Transfer(address from, address to, uint amount, string message, uint256 timestamp, string keyword);

    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }

    function isOwner() internal view returns(bool) {
        return owner() == msg.sender;
    }

    function emergencyWithdraw() external onlyWhenStopped onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }

    function destroy() external onlyWhenStopped onlyOwner {
        selfdestruct(payable(address(this)));
    }

    function stopContract() external onlyOwner {
        isStopped = true;
    }

    function resumeContract() external onlyOwner {
        isStopped = false;
    }

    function addAllowance(address _who, uint _amount) public onlyOwner {
        allowance[_who] = _amount;
        emit AllowanceChanged(_who, msg.sender, allowance[_who], _amount);
    }

    function reduceAllowance(address _who, uint _amount) public ownerOrAllowed(_amount) {
        emit AllowanceChanged(_who, msg.sender, allowance[_who], allowance[_who].sub(_amount));
        allowance[_who] =  allowance[_who].sub(_amount);
    }

    function getAllowance() public view returns (uint) {
        return allowance[msg.sender];
    }   

    function addToBlockchain(address payable to, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        emit Transfer(msg.sender, to, amount, message, block.timestamp, keyword);
        transactions.push(TransferStruct(msg.sender, to, amount, message, block.timestamp, keyword));
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }
    
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function getTransactionsLength() public view returns(uint256) {
        return transactions.length;
    }

    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllowed(_amount) {
        require(_amount <= address(this).balance, "Insufficient funds!");
        if(!isOwner()) {
            reduceAllowance(msg.sender, _amount);
        }
        emit MoneySent(_to, _amount);
        _to.transfer(_amount);
    }

    function renounceOwnership() public view override onlyOwner {
        revert("Cannot renounce ownership!");
    }

}