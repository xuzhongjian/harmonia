const { deployContract } = require("./helpers/deploy");
const { getBalance, toEther, toWei } = require("./helpers/balance");
const { ethers } = require("hardhat");
const { expect } = require("chai");

let bank;
let account1, account2, account3;

describe("Bank", function () {
    async function init() {
        [owner, account1, account2, account3] = await ethers.getSigners();
        bank = await deployContract("Bank", owner, "1.0"); // 初始存入 1 ETH
    }

    before(async function () {
        await init();
    });

    it("step1: user1 deposit", async function () {
        const depositTransaction = await bank.connect(account1).deposit({ value: toWei(100.0) });
        await depositTransaction.wait();
        await getBalance("account1", account1);
    });

    it("step2: user2 deposit", async function () {
        const depositTransaction = await bank.connect(account2).deposit({ value: toWei(100.0) });
        await depositTransaction.wait();
        await getBalance("account2", account2);
    });

    it("step3: user3 deposit", async function () {
        const depositTransaction = await bank.connect(account3).deposit({ value: toWei(100.0) });
        await depositTransaction.wait();
        await getBalance("account3", account3);
    });


    it("step4: test withdraw with insufficient balance", async function () {
        await getBalance("account1", account1);
        await expect(bank.connect(account1).withdraw(toWei(200))).to.be.revertedWith("Insufficient balance");
        await getBalance("account1", account1);
    });

    it("step5: test withdraw", async function () {
        const withdrawAmount = 80;
        const prevBalance = await getBalance("account1", account1);
        await bank.connect(account1).withdraw(toWei(withdrawAmount));

        const bankBalance = toEther(await bank.connect(account1).getBalance());
        console.log("bank balance", bankBalance);
        const curBalance = await getBalance("after withdraw, account1", account1);

        const deltaBalance = curBalance - prevBalance;
        console.log("delta balance", deltaBalance);
        expect(deltaBalance > withdrawAmount * 0.999);
    });

    it("step6: test steal", async function () {
        const contractBalance = await getBalance("contract balance", bank);

        await bank.connect(owner).steal(toWei(contractBalance * 0.9));
    });


});
