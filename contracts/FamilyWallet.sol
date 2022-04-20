//SPDX-License-Identifier: MIT

pragma solidity >= 0.7.0 < 0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract FamilyWallet is Ownable{

    using SafeMath for uint;

    uint public numOfBeneficiaries;
    uint256 transactionCount;

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

    event AllowanceChanged(address indexed _forWho, address indexed _byWhom, uint _oldAmount, uint _newAmount);
    event MoneySent (address indexed _beneficiary, uint _amount);
    event MoneyReceived (address indexed _from, uint _amount);
    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    receive() external payable {
        emit MoneyReceived(msg.sender, msg.value);
    }

    function addAllowance(address _who, uint _amount) public onlyOwner {
        allowance[_who] = _amount;
        emit AllowanceChanged(_who, msg.sender, allowance[_who], _amount);
    }

    function reduceAllowance(address _who, uint _amount) public onlyOwner {
        emit AllowanceChanged(_who, msg.sender, allowance[_who], allowance[_who].sub(_amount));
        allowance[_who] =  allowance[_who].sub(_amount);
    }

    function getAllowance(address _who) public view returns (uint) {
        return allowance[_who];
    }   

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function withdrawMoney(address payable _to, uint _amount) public ownerOrAllowed(_amount) {
        require(_amount <= address(this).balance, "Insufficient funds!");
        if(!isOwner()) {
            reduceAllowance(msg.sender, _amount);
        }
        _to.transfer(_amount);
        emit MoneySent(_to, _amount);
    }

    function renounceOwnership() public view override onlyOwner {
        revert("Cannot renounce ownership!");
    }

    function isOwner() internal view returns(bool) {
        return owner() == msg.sender;
    }
}