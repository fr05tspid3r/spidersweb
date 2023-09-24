// Initialize Web3.js and your contract here
const web3 = new Web3(window.ethereum);

// Assuming your contract ABI and address
const contractAbi = ["0x37e98fa8054ac12d30f8b78e75fd6d92c272a1498b06e562abcfcc958641389d"]; // Replace with your ABI
const contractAddress = "0x6267c586459A9ba4D63d4584f89D1e1f9941C47a"; // Replace with your contract address

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Function to check for MetaMask
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

// Add a button to check for MetaMask
const checkMetaMaskButton = document.createElement('button');
checkMetaMaskButton.textContent = 'Check for MetaMask';
checkMetaMaskButton.addEventListener('click', checkForMetaMask);

// Function to mint NFT
async function mintNFT() {
    try {
        // Get the user's Ethereum address
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        // Set the NFT name and image URI
        const nftName = "CheddarBagel";
        const imageURI = "IMG_0306.jpeg";

        // Estimate gas and gas price
        const gasEstimate = await contract.methods.mintNFT(nftName, imageURI).estimateGas({ from: userAddress });
        const gasPrice = await web3.eth.getGasPrice();

        // Send a transaction to the mintNFT function
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

// Add a button to mint the NFT
const mintNFTButton = document.createElement('button');
mintNFTButton.textContent = 'Mint NFT';
mintNFTButton.addEventListener('click', mintNFT);

// Append the buttons to your HTML
document.body.appendChild(checkMetaMaskButton);
document.body.appendChild(mintNFTButton);
