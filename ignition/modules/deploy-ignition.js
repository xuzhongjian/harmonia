// 1.  Import the `buildModule` function from the Hardhat Ignition module
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// 2. define constants
const JAN_1ST_2030 = 1893456000;

// 3. Export a module using `buildModule`
module.exports = buildModule("CounterModule", (m) => {

    // 4. get constants from define
    const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);

    // 5. Use the `getAccount` method to select the deployer account
    const deployer = m.getAccount(0);

    // 6. Deploy the `Counter` contract
    const counter = m.contract("Counter", [], {  from: deployer  });

    // 7. Return an object from the module
    return { counter };
});
