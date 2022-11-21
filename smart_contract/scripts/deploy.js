const hre = require('hardhat');

const Main = async () => {
  const Transactions = await hre.ethers.getContractFactory('Transactions');
  const transactions = await Transactions.deploy();
  await transactions.deployed();
  console.log('Transaction deployed to', transactions.address);
};
const runMain = async () => {
  try {
    await Main();
    process.exit(0);
  } catch (error) {
    console.log('Some error occurred');
    process.exit(1);
  }
};
runMain();
