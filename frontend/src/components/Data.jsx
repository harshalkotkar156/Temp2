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
                // 0x845c15011E9f45fBF49F4D1b778FC6a51d4801CC
                const contractAddress="0x00CB2796BD33f2B0129fC182DBd4b724199B29b7";

                const contractABI = bytedata.abi;
                console.log("Thisis Contrct abi : ",contractABI);
                
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
                setState({ provider, signer, contract});

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
            console.log("This is Stock : ",stock);
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
            const increaseAmount = parseInt(inputElement.value, 10);
    
            if (isNaN(increaseAmount) || increaseAmount <= 0) {
                alert("Please enter a valid positive number");
                return;
            }
    
            console.log("Increasing stock by:", increaseAmount);
    
            const tx = await contract.increaseStock(increaseAmount, { gasLimit: 3043893281 });
            console.log("Transaction sent:", tx);
    
            await tx.wait(); // Wait for transaction confirmation
            alert("Stock increased!");
        } catch (error) {
            console.error("Error increasing stock:", error);
            alert("Error increasing stock: " + (error.reason || error.message));
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
    
            const tx = await contract.reduceStock(decreaseAmount, { gasLimit: 3000000 });
            console.log("Transaction sent:", tx);
    
            await tx.wait(); // Wait for transaction confirmation
            console.log("Transaction done:", tx);
            alert("Stock decreased!");
    
            // getStock(); // Refresh stock value
        } catch (error) {
            console.error("Error decreasing stock:", error);
            alert("Error decreasing stock: " + (error.reason || error.message));
        }
    }

    // async function incrementStock() {
    //     try {
    //         const { contract } = state;
    //         if (!contract) {
    //             alert("Contract not initialized!");
    //             return;
    //         }
    
    //         const inputElement = document.getElementById("increaseStockInput");
    //         const increaseAmount = parseInt(inputElement.value, 10);
            
    //         if (isNaN(increaseAmount) || increaseAmount <= 0) {
    //             alert("Please enter a valid positive number");
    //             return;
    //         }
    
    //         console.log("Increasing stock by:", increaseAmount);
    
    //         // await contract.increaseStock(10, { gasLimit: 500000
    //         // Use BigNumber
    //         const tx = await contract.increaseStock(increaseAmount, { gasLimit: 3000000 });
    //         console.log("HEre");
    //         await tx.wait(); // Wait for transaction confirmation
    //         alert("Stock increased!");

    //     } catch (error) {
    //         console.error("Error increasing stock:", error);
    //         alert("Error increasing stock: " + (error.reason || error.message));
    //     }
    // }
    

    // async function decrementStock() {
    //     try {
    //         const { contract } = state;
    //         if (!contract) {
    //             alert("Contract not initialized!");
    //             return;
    //         }

    //         const inputElement = document.getElementById("decreaseStockInput");
    //         const decreaseAmount = parseInt(inputElement.value, 10); // Convert to integer

    //         if (isNaN(decreaseAmount) || decreaseAmount <= 0) {
    //             alert("Please enter a valid positive number");
    //             return;
    //         }

    //         const tx = await contract.reduceStock(decreaseAmount);
            
    //         await tx.wait(); // Wait for transaction confirmation
    //         console.log("Tracnsactoin done",tx);
    //         alert("Stock decreased!");

    //         // getStock(); // Refresh stock value
    //     } catch (error) {
    //         console.error("Error decreasing stock:", error);
    //         alert("Error decreasing stock: " + error.message);
    //     }
    // }

    return (
        <div>
            <p>Connected Account: {account}</p>
            
            <button onClick={getStock}>Fetch Stock</button>
            <p>Current Stock: {stockVal}</p>

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
// 0xa754d1178ed3892412da7778c56fccd622ffc095c3393602afe7308cf7140c5c
// a754d1178ed3892412da7778c56fccd622ffc095c3393602afe7308cf7140c5c