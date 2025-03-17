const { ethers } = require("hardhat");
const { expect } = require("chai");

let gantenAddress;
let owner, user;  // 这里先声明变量

describe("CallerAddress", function () {
    before(async function () {
        [owner, user] = await ethers.getSigners(); // 获取两个账户
        const CallerAddress = await ethers.getContractFactory("CallerAddress");
        callerAddress = await CallerAddress.connect(owner).deploy();  // 用 owner 部署
        await callerAddress.waitForDeployment();
        console.log("gantenAddress deployed at:", callerAddress.target);
        // 获取并打印余额
        const ownerBalance = await owner.provider.getBalance(owner.address);
        console.log("owner balance:", ownerBalance);

        const userBalance = await user.provider.getBalance(user.address);
        console.log("user balance:", userBalance);
    });

    it("step0: should return the owner address", async function () {
        const userAddress = await callerAddress.connect(owner).getCallerAddress();
        expect(userAddress).to.equal(owner.address);
    });

    it("step1: should return user address", async function () {
        const userAddress = await callerAddress.connect(user).getCallerAddress();
        expect(userAddress).to.equal(user.address);
    });
});
