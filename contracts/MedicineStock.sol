// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineStock {
    int public stock = 5;

    function getStock() public view returns (int) {
        return stock;
    }

    function reduceStock(int _amount) public {
        require(_amount > 0, "Amount must be greater than zero");
        require(stock >= _amount, "Not enough stock available");
        stock -= _amount;
    }


    function increaseStock(int _amount) public returns (int) {
        require(_amount > 0, "Amount must be greater than zero");
        require(stock + _amount > stock, "Stock overflow error");
        stock += _amount;
        return stock;
    }
}
