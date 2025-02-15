import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import bytedata from '../contractData/MedicineStock.json';

export const Data = () => {
    const [stockVal, setStock] = useState(0);
    const [account, setAccount] = useState("Not-Connected");
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    });

    useEffect(() => {
        const connectWallet = async () => {
            try {
                const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                const contractABI = bytedata.abi;
                const { ethereum } = window;

                if (!ethereum) {
                    alert("Please install MetaMask!");
                    return;
                }

                const accounts = await ethereum.request({ method: "eth_requestAccounts" });
                setAccount(accounts[0]); // Store the first account

                const provider = new ethers.BrowserProvider(ethereum); // Reading 
                const signer = await provider.getSigner(); // Writing
                const contract = new ethers.Contract(contractAddress, contractABI, signer);

                console.log("Contract initialized:", contract);
                setState({ provider, signer, contract });

            } catch (error) {
                alert("Error connecting to MetaMask: " + error.message);
            }
        };

        connectWallet();
    }, []);

    async function getStock() {
        try {
            const { contract } = state;
            if (!contract) {
                alert("Contract not initialized!");
                return;
            }

            const stock = await contract.getStock(); // Returns a BigInt

            const stockValue = Number(stock); // Convert BigInt to Number
            setStock(stockValue); // Update React state
            console.log("Current Stock:", stockValue);
            
        } catch (error) {
            console.error("Error fetching stock:", error);
            alert("Error fetching stock: " + error.message);
        }
    }

    async function incrementStock() {
        try {
            const { contract } = state;
            if (!contract) {
                alert("Contract not initialized!");
                return;
            }

            const inputElement = document.getElementById("increaseStockInput");
            const increaseAmount = parseInt(inputElement.value, 10); // Convert to integer

            if (isNaN(increaseAmount) || increaseAmount <= 0) {
                alert("Please enter a valid positive number");
                return;
            }

            const tx = await contract.increaseStock(increaseAmount);
            await tx.wait(); // Wait for transaction confirmation

            alert("Stock increased!");
            // getStock(); // Refresh stock value
        } catch (error) {
            console.error("Error increasing stock:", error);
            alert("Error increasing stock: " + error.message);
        }
    }

    async function decrementStock() {
        try {
            const { contract } = state;
            if (!contract) {
                alert("Contract not initialized!");
                return;
            }

            const inputElement = document.getElementById("decreaseStockInput");
            const decreaseAmount = parseInt(inputElement.value, 10); // Convert to integer

            if (isNaN(decreaseAmount) || decreaseAmount <= 0) {
                alert("Please enter a valid positive number");
                return;
            }

            const tx = await contract.reduceStock(decreaseAmount);
            await tx.wait(); // Wait for transaction confirmation

            alert("Stock decreased!");

            // getStock(); // Refresh stock value
        } catch (error) {
            console.error("Error decreasing stock:", error);
            alert("Error decreasing stock: " + error.message);
        }
    }

    return (
        <div>
            <p>Connected Account: {account}</p>
            
            <button onClick={getStock}>Fetch Stock</button>
            <p>Current Stock: {stockVal !== null ? stockVal : "Loading..."}</p>

            <div>
                <input id="increaseStockInput" type="number" placeholder="Enter amount" />
                <button onClick={incrementStock}>Increase Stock</button>
            </div>

            <br />

            <div>
                <input id="decreaseStockInput" type="number" placeholder="Enter amount" />
                <button onClick={decrementStock}>Decrease Stock</button>
            </div>
        </div>
    );
};
