
const hre = require("hardhat");

async function main() {
  const MedicineStock = await hre.ethers.getContractFactory("MedicineStock"); // Fetching the contract
  const stock = await MedicineStock.deploy(10); // Deploying the contract with initial stock

  await stock.waitForDeployment(); // Wait for deployment to complete
  const contractAddress = await stock.getAddress();
  
  console.log("Deployed contract address:", contractAddress);
  console.log("HEy");
  
}


// 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



// const hre = require("hardhat");

// async function main() {
//     const MedicineStock = await hre.ethers.getContractFactory("MedicineStock");
    
//     // Deploy the contract with an initial stock of 10
//     const stock = await MedicineStock.deploy(10);

//     // Wait for deployment to complete
//     await stock.waitForDeployment();
//     const contractAddress = await stock.getAddress();

//     // Get contract address
//     console.log("Deployed contract address:", contractAddress);
// }

// // Execute deployment script
// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error("Deployment error:", error);
//         process.exit(1);
//     });
