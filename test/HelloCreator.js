const { deployContract } = require("./helpers/deploy");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Hello and HelloCreator Contract", function () {
    let Hello, hello;
    let HelloCreator, helloCreator;
    let owner;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        // 部署 HelloCreator
        helloCreator = await deployContract("HelloCreator", owner, "5");

        console.log("helloCreator deployed at:", helloCreator.target);
        console.log("owner address of helloCreator:", owner.address);
    });

    it("应该成功创建 Hello 合约", async function () {
        // 调用 createHello
        const tx = await helloCreator.createHello();
        await tx.wait();

        // 获取创建的合约地址
        const helloAddress = await helloCreator.h();

        // 确保地址有效
        expect(helloAddress).to.properAddress;

        // 连接到新创建的 Hello 合约
        Hello = await ethers.getContractFactory("Hello");
        hello = await Hello.attach(helloAddress);

        // 测试 sayHi()
        expect(await hello.connect(user).sayHello()).to.equal(10);

        ownerAddress = await hello.returnOwner();

        console.log("owner address of hello:", ownerAddress)
    });
});
