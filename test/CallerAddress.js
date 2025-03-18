const { deployContract } = require("./helpers/deploy");
const { getBalance } = require("./helpers/balance");
const { ethers } = require("hardhat");
const { expect } = require("chai");

let gantenAddress;
let owner, user;  // 这里先声明变量

describe("CallerAddress", function () {
    before(async function () {
        // 获取两个账户
        [owner, user] = await ethers.getSigners();

        // 使用 owner 账户部署合约，并且给定一定的余额
        callerAddress = await deployContract("CallerAddress", owner, "1000");

        // 获取并打印两个账户的余额
        await getBalance(user, "user");
        await getBalance(owner, "owner");
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

        // 获取并打印两个账户的余额
        await getBalance(user, "user");
        await getBalance(owner, "owner");
    });
});
