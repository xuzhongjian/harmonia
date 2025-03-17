const { ethers } = require("hardhat");

async function main() {
      const [owner, otherAccount] = await ethers.getSigners();
      const Counter = await ethers.getContractFactory("Counter");
      counter = await Counter.deploy();

      await counter.waitForDeployment();
      console.log("counter deployed at:", counter.target);
}

main();