const { ethers } = require("hardhat");

/**
 * 部署一个指定名称的合约，并初始化其拥有者和余额
 *
 * @param {string} contractName 合约的名称，用于识别和部署特定类型的合约。
 * @param {string} owner 合约的拥有者地址，通常是合约部署后管理合约的账户。
 * @param {string|number} balance 合约的初始余额，表示部署时赋予合约的资产。
 * @param  {...any} args 附加参数，根据不同合约的要求传递额外的初始化参数。
 *
 * @returns {Promise} 返回一个包含合约地址的 Promise, 表示合约成功部署后返回该地址。
 */
async function deployContract(contractName, owner, balance = "0", ...args) {
    const ContractFactory = await ethers.getContractFactory(contractName);

    // 连接指定的 owner 并传递 ETH 余额
    const contract = await ContractFactory.connect(owner).deploy(...args, {
        value: ethers.parseEther(balance.toString()) // 指定初始 ETH 余额
    });

    await contract.waitForDeployment();

    console.log(`${contractName} deployed at:`, contract.target);
    console.log(`Deployed by:`, owner.address);
    console.log(`Initial balance: ${balance} ETH`);

    return contract;
}

module.exports = { deployContract };
