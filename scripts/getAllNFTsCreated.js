const Web3 = require('web3');
const contractAbi = require('../abi/ERC721ABI.json');

// Connect to the Ethereum network using Infura
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/29b39502fc0d49b9974824e615e53f77'));

// Set the address of the wallet to retrieve the deployed contracts for
const walletAddress = '0x4CaE7f8d56b3399b03d19aFD404fc978fd1965ee';

const getAllContracts = async () => {
    const endBlock = await web3.eth.getBlockNumber();
    // Perform binary search to find the earliest block number where the wallet address was active
    for (let i = 15341669; i <= endBlock; i++) {
        const block = await web3.eth.getBlock(i, true);
        if (block && block.transactions) {
            block.transactions.forEach((transaction) => {
                // Check if the transaction was sent from the wallet address
                if (transaction.from.toLowerCase() === walletAddress.toLowerCase()) {
                    const contract = new web3.eth.Contract(contractAbi, transaction.to);
                    // Check if the contract is an instance of the ERC-721 contract
                    try {
                        contract.methods.supportsInterface('0x80ac58cd').call().then((isERC721) => {
                            if (isERC721) {
                                console.log(`NFT contract deployed by ${walletAddress}: ${transaction.to}`);
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        }
    }
}

getAllContracts();