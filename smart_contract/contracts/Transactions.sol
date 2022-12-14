//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
contract Transactions{
    event Transfer(address from, address receiver,uint amount,string message, uint256 timestamp, string keyword);
    struct TransferStruct{
        address from;
        address receiver;
        uint amount;

        string message;
        uint256 timestamp;
        string keyword;
    }
    TransferStruct[] transactions;
    uint256 transactionCounter=0;
    function addToBlockchain(address payable receiver, uint amount, string memory message,string memory keyword) public payable {
        transactionCounter+=1;
        transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    function getAllTransactions() public view returns (TransferStruct[] memory){
        return transactions;
    }
    function getTransactionCount() public view returns (uint256){
        return transactionCounter;
    }
}