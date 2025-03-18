const { ethers } = require("hardhat");

async function getBalance(message, addressOrContract) {
    // 判断传入的是普通地址还是合约实例
    const isContract = addressOrContract.address || addressOrContract.target;
    const address = isContract ? (addressOrContract.target || addressOrContract.address) : addressOrContract;

    // 获取地址的余额
    const balance = await ethers.provider.getBalance(address);

    // 使用 BigNumber 来避免浮动精度问题
    const balanceInEther = ethers.formatEther(balance);
    const balanceInSixDecimals = parseFloat(balanceInEther).toFixed(6);  // 保留六位小数

    // 根据是否是合约来决定打印地址
    const displayAddress = isContract ? address : addressOrContract;

    console.log(message, "- Address:", displayAddress, " - Balance:", balanceInSixDecimals, "ETH");
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
