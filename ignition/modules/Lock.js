
const hre = require("hardhat");

async function main() {
  const MedicineStock = await hre.ethers.getContractFactory("MedicineStock"); // Fetching the contract
  const stock = await MedicineStock.deploy(); // Deploying the contract with initial stock

  await stock.waitForDeployment(); // Wait for deployment to complete
  const contractAddress = await stock.getAddress();
  // console.log("===========");
  console.log("Deployed contract address:", contractAddress);
  console.log("HEy");
  // console.log("Deployed contract address: ",await stock.address);
  // console.log("===========");
}


// 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main().catch((error) => {
//   console.log("till here");
//   console.error(error);
//   process.exitCode = 1;
// });
//0xa64e3144835aF8781c750ceC432784a68d883266
