const { expect } = require("chai");
const hre = require("hardhat");

describe("Token contract", function () {
  let Token;
  let testToken;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    testToken = await Token.deploy("TST", "Test Token");
  });

  describe("Deployment", function () {
    it("Should set name correct", async function () {
      expect(await testToken.name()).to.equal("Test Token");
    });

    it("Should set symbol correct", async function () {
      expect(await testToken.symbol()).to.equal("TST");
    });
  });

  describe("Mint", function () {
    it("Should mint tokens to owner", async function () {
      const ownerFirstBalance = await testToken.balanceOf(owner.address);
      await testToken.connect(owner).mint(owner.address, 1000);
      const ownerSecondBalance = await testToken.balanceOf(owner.address);
      expect(ownerSecondBalance).to.equal(ownerFirstBalance + 1000n);
    });

    it("Should not mint token to addr1", async function () {
      await expect(
        testToken.connect(addr1).mint(addr1.address, 1000)
      ).to.be.revertedWith("only owner can mint");
    });

  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await testToken.connect(owner).mint(owner.address, 1000);

      await testToken.connect(owner).transfer(addr1.address, 50);
      const addr1Balance = await testToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50n);

      await testToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await testToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50n);
    });
  
    it("Should fail if sender doesn't have enough tokens", async function () {
      await testToken.connect(owner).mint(owner.address, 1000);

      const initialOwnerBalance = await testToken.balanceOf(owner.address);
      await expect(
        testToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("insufficient balance");

      expect(await testToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      await testToken.connect(owner).mint(owner.address, 1000);

      const initialOwnerBalance = await testToken.balanceOf(owner.address);
      await testToken.transfer(addr1.address, 100);
      await testToken.transfer(addr2.address, 50);
    
      const finalOwnerBalance = await testToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150n);
      const addr1Balance = await testToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100n);
      const addr2Balance = await testToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50n);
    });
  });
});
