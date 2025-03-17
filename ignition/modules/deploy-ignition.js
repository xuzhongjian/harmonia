// scripts/deploy.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


const JAN_1ST_2030 = 1893456000;

module.exports = buildModule("CounterModule", (m) => {

    const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
    const deployer = m.getAccount(0);
    const counter = m.contract("Counter", [], {  from: deployer  });
    return { counter };
});
