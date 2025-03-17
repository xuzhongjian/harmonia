const { ethers } = require("hardhat");
const { expect } = require("chai");

let counter;

describe("Counter", function () {
    async function init() {
      const [owner, otherAccount] = await ethers.getSigners();
      const Counter = await ethers.getContractFactory("Counter");
      counter = await Counter.deploy();
      await counter.waitForDeployment();
      console.log("counter deployed at:", counter.target);
    }

    before(async function () {
    await init();
    });

    it("step1: init equal 0", async function () {
    expect(await counter.get()).to.equal(0);
    });

    it("step2: add 1 equal 1", async function () {
    let tx = await counter.count();
    await tx.wait();
    expect(await counter.get()).to.equal(1);
    });

    it("step3: add 2 equal 3", async function () {
    let tx = await counter.add(2);
    await tx.wait();
    expect(await counter.get()).to.equal(3);
    });

    it("step4: subtract 1 equal 2", async function () {
    let tx = await counter.subtract(1);
    await tx.wait();
    expect(await counter.get()).to.equal(2);
    });
});
