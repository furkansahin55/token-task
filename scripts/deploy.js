const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("Token");
  const testToken = await Token.deploy("TST", "Test Token");
  await testToken.waitForDeployment();
  console.log("token deployed: ", testToken.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
