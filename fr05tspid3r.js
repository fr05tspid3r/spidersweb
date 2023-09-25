const web3 = new Web3(window.ethereum);

const contractAbi = [0x37e98fa8054ac12d30f8b78e75fd6d92c272a1498b06e562abcfcc958641389d];
const contractAddress = "0x5e71f6d08BCb7622318Ce4239051235976DA50f9";

const contract = new web3.eth.Contract(contractAbi, contractAddress);

function checkForMetaMask() {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        // The user has MetaMask or another Ethereum wallet
        // Proceed with the DApp logic
        // For example, show other UI elements or enable wallet-related functionality
        console.log('MetaMask is installed.');
    } else {
        // Prompt the user to install MetaMask or use an Ethereum wallet
        alert('Please install MetaMask or use an Ethereum wallet to interact with this DApp.');
    }
}


const checkMetaMaskButton = document.createElement('button');
checkMetaMaskButton.textContent = 'Check for MetaMask';
checkMetaMaskButton.addEventListener('click', checkForMetaMask);

async function mintNFT() {
    try {
        
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        
        const nftName = "CheddarBagel";
        const imageURI = "IMG_0306.jpeg";

        const gasEstimate = await contract.methods.mintNFT(nftName, imageURI).estimateGas({ from: userAddress });
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: userAddress,
            to: contractAddress,
            gas: gasEstimate, // You can adjust this value as needed
            gasPrice: gasPrice,
        };

        const signedTx = await web3.eth.signTransaction(tx);
        const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Handle the transaction result
        console.log('Transaction Hash:', result.transactionHash);
    } catch (error) {
        console.error('Error minting NFT:', error);
    }
}

const mintNFTButton = document.createElement('button');
mintNFTButton.textContent = 'Mint NFT';
mintNFTButton.addEventListener('click', mintNFT);

document.body.appendChild(checkMetaMaskButton);
document.body.appendChild(mintNFTButton);
