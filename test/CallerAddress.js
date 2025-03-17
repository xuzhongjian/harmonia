const { ethers } = require("hardhat");
const { expect } = require("chai");

let gantenAddress;
let owner, user;  // 这里先声明变量
const INIT_BALANCE = ethers.parseEther("1000");

describe("CallerAddress", function () {
    before(async function () {
        // 获取两个账户
        [owner, user] = await ethers.getSigners();

        // 使用 owner 账户部署合约，并且给定一定的余额
        const CallerAddress = await ethers.getContractFactory("CallerAddress");
        callerAddress = await CallerAddress.connect(owner).deploy({ value: INIT_BALANCE });
        await callerAddress.waitForDeployment();
        console.log("gantenAddress deployed at:", callerAddress.target);

        // 获取并打印两个账户的余额
        const ownerBalance = await owner.provider.getBalance(owner.address);
        console.log("start: owner balance:", ownerBalance);
        const userBalance = await user.provider.getBalance(user.address);
        console.log("start: user balance:", userBalance);
        const contractBalance = await callerAddress.getContractBalance();
        console.log("start: contract balance:", contractBalance);
    });

    it("step0: should return the owner address", async function () {
        const userAddress = await callerAddress.connect(owner).getCallerAddress();
        expect(userAddress).to.equal(owner.address);
    });

    it("step1: should return user address", async function () {
        const userAddress = await callerAddress.connect(user).getCallerAddress();
        expect(userAddress).to.equal(user.address);
    });

    it("step2: should transfer to the caller", async function () {
        // 使用 user 去调用合约，合约会给 user 转账
        const tx = await callerAddress.connect(user).transferToCaller();
        await tx.wait();

        // 打印最后的两个账户的余额
        const ownerBalance = await owner.provider.getBalance(owner.address);
        console.log("end: owner balance:", ownerBalance);
        const userBalance = await user.provider.getBalance(user.address);
        console.log("end: user balance:", userBalance);
        const contractBalance = await callerAddress.getContractBalance();
        console.log("end: contract balance:", contractBalance);
    });
});
