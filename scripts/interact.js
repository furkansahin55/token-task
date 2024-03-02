require("dotenv").config();
const { ethers } = require("ethers");

const tokenABI = require("../artifacts/contracts/Token.sol/Token.json").abi;

const tokenAddress = "0x8e911f850fe16a1b2a4d2bae0d0f930d5d60bbda";
const rpcUrl = process.env.INFURA_SEPOLIA_ENDPOINT;
const privateKey = process.env.PRIVATE_KEY;


const provider = new ethers.JsonRpcProvider(rpcUrl);

const wallet = new ethers.Wallet(privateKey, provider);

const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);


(async () => {
    const yourAddress = wallet.address;
    const recipientAddress = "0x0000000000000000000000000000000000000000";

    const yourstartBalance = await tokenContract.balanceOf(yourAddress);
    const recipientstartBalance = await tokenContract.balanceOf(recipientAddress);

    console.log("Your Balance:", ethers.formatEther(yourstartBalance));
    console.log("Recipient Balance:", ethers.formatEther(recipientstartBalance));
    
    // Mint some tokens
    console.log("Minting tokens ...");
    const amountToMint = ethers.parseEther("100");
    const mintTx = await tokenContract.mint(yourAddress, amountToMint);
    await mintTx.wait();
    console.log("100 Tokens minted");

    // Transfer tokens to 0x address
    console.log("Transferring tokens ...");
    const amountToTransfer = ethers.parseEther("50"); // Transfer 50 tokens
    const transferTx = await tokenContract.transfer(recipientAddress, amountToTransfer);
    await transferTx.wait();
    console.log("50 Tokens transferred");

    // Get balances
    const yourBalance = await tokenContract.balanceOf(yourAddress);
    const recipientBalance = await tokenContract.balanceOf(recipientAddress);

    console.log("Your Balance:", ethers.formatEther(yourBalance));
    console.log("Recipient Balance:", ethers.formatEther(recipientBalance));
})();
