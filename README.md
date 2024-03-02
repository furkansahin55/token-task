# Sample Token Project

Sample token project with minting and ownership enabled

Install dependencies
```shell
yarn install
```

Rename test.env .env and set env variables

Compile:
```shell
npx hardhat compile
```

Test:
```shell
npx hardhat test
```

Deploy to Sepolia:
```shell
npx hardhat run --network sepolia scripts/deploy.js
```

Interact with already deployed sepolia contract:
```shell
node scripts/interact.js
```
