document.addEventListener('DOMContentLoaded', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const mintButton = document.getElementById('mintButton');

        mintButton.addEventListener('click', async () => {
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                // Now MetaMask is connected, and you can proceed with the transaction
                const abi = [
                    // Replace with your contract's ABI
                ];
                const contractAddress = 'your-contract-address'; // Replace with your contract's address
                const contract = new web3.eth.Contract(abi, contractAddress);

                const tokenURI = 'https://your-ipfs-image-link'; // Replace with your token URI
                const accounts = await web3.eth.getAccounts();
                const senderAddress = accounts[0];

                // Call the mintNFT function on your smart contract
                const result = await contract.methods.mintNFT(senderAddress, tokenURI).send({ from: senderAddress });

                if (result.status) {
                    alert("NFT minted successfully!");
                } else {
                    alert("NFT minting failed!");
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        alert('Please install MetaMask to use this application.');
    }
});
