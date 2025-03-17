require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // 加载 .env 文件

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia.publicnode.com",
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY
  }
};