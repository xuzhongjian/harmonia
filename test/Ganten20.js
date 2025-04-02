const { ethers } = require("hardhat");
const { expect } = require("chai");

let ganten20;

describe("Ganten20", function () {
    async function init() {
        const [owner, account1, account2, account3] = await ethers.getSigners();
        const Ganten20 = await ethers.getContractFactory("Ganten20");
        ganten20 = await Ganten20.deploy("ZX Coin", "ZXC");
        await ganten20.waitForDeployment();
        console.log("ganten20 deployed at:", ganten20.target);
    }

    before(async function () {
        await init();
    });

    it(async function () {
        expect(await ganten20.totalSupply()).to.equal(1_000_000_000);
    });

    it(async function () {
        await ganten20.mint()
        expect(await ganten20.totalSupply()).to.equal(1_000_000_000);
    });

    it(async function () {
        expect(await ganten20.totalSupply()).to.equal(1_000_000_000);
    });

    it(async function () {
        expect(await ganten20.totalSupply()).to.equal(1_000_000_000);
    });

    it(async function () {
        expect(await ganten20.totalSupply()).to.equal(1_000_000_000);
    });


    it(async function () {
        expect(await ganten20.totalSupply()).to.equal(1_000_000_000);
    });
});
