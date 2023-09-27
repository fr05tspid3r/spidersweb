document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const mintButton = document.getElementById('mintButton');
//🔥Burnt
        mintButton.addEventListener('click', async () => {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                
                const abi = [
                    //ABI
                ];


                const contractAddress = 'contract-address'; //contract address
                const contract = new web3.eth.Contract(abi, contractAddress);

                const tokenURI = 'https://github.com/fr05tspid3r/spidersweb/blob/main/IMG_0306.jpeg?raw=true'; //URL
                const accounts = await web3.eth.getAccounts();
                const senderAddress = accounts[0];

                //mintNFT def
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
