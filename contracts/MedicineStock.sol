// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineStock {
    int public stock;

    // Events for debugging
    event StockReduced(int newStock, int amount);
    event InsufficientStock(int currentStock, int requiredAmount);

    // Constructor to initialize stock
    constructor(int _initialStock) {
        stock = _initialStock;
    }

    function getStock() public view returns (int) {
        return stock;
    }

    function reduceStock(int _amount) public {
        require(_amount > 0, "Amount must be greater than zero");
        require(stock >= _amount, "Not enough stock available");

        // Log the current stock before reduction
        emit InsufficientStock(stock, _amount);

        stock -= _amount;

        // Log the new stock after reduction
        emit StockReduced(stock, _amount);
    }

    function increaseStock(int _amount) public {
        require(_amount > 0, "Amount must be greater than zero");
        stock += _amount;
    }
}