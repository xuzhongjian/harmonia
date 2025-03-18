const { ethers } = require("hardhat");

// 获取地址或合约的余额
async function getBalance(addressOrContract, message) {
    // 如果传入的是合约实例，获取合约的地址
    const address = addressOrContract.address ? addressOrContract.address : addressOrContract;

    // 获取地址的余额
    const balance = await ethers.provider.getBalance(address);

    // 使用 BigNumber 来避免浮动精度问题
    const balanceInEther = ethers.formatEther(balance);
    const balanceInSixDecimals = parseFloat(balanceInEther).toFixed(6);  // 保留六位小数

    console.log(message, " - ", address, " - ", balanceInSixDecimals, "ETH");
    return balanceInSixDecimals;
}

// 将 Wei 转换为 Ether
function toEther(nWei) {
    const etherValue = ethers.formatEther(nWei);
    return etherValue;
}

// 将 Ether 转换为 Wei
function toWei(nEther) {
    // 使用 BigNumber 来处理非常大的数字
    const weiValue = ethers.parseUnits(nEther.toString(), "ether");
    return weiValue;
}

module.exports = { getBalance, toEther, toWei };
