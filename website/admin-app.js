let web3;
let contract;
const contractAddress = '0xac08BD4f1A910564173E807be9a26DD56926eAb1 ';  // Replace with your deployed contract address
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DonationReceived",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "donate",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "donations",
		"outputs": [
			{
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getDonation",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDonationCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalDonations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

window.onload = async function () {
    if (typeof window.ethereum !== 'undefined') {
        try {
            web3 = new Web3(window.ethereum);
            await ethereum.request({ method: 'eth_requestAccounts' });

            contract = new web3.eth.Contract(contractABI, contractAddress);
            document.getElementById('status').innerText = "Connected to MetaMask!";
            
            loadDonations();
        } catch (error) {
            console.error("User denied account access:", error);
            document.getElementById('status').innerText = "Please connect MetaMask!";
        }
    } else {
        document.getElementById('status').innerText = "MetaMask not detected!";
    }
};

async function loadDonationsAdmin() {
    try {
        const totalDonations = await contract.methods.getDonationCount().call();
        const totalDonatedAmount = await contract.methods.getBalance().call();

        document.getElementById('total-donations').innerText = web3.utils.fromWei(totalDonatedAmount, 'ether');

        const donationList = document.getElementById('donation-list');
        donationList.innerHTML = '';

        if (totalDonations > 0) {
            for (let i = 0; i < totalDonations; i++) {
                const donation = await contract.methods.getDonation(i).call();
                const donor = donation[0];
                const amount = web3.utils.fromWei(donation[1], 'ether');
                donationList.innerHTML += `<li>Donor: ${donor} - Amount: ${amount} ETH</li>`;
            }
        } else {
            donationList.innerHTML = '<li>No donations yet.</li>';
        }
    } catch (error) {
        console.error("Error loading donations:", error);
        document.getElementById('status').innerText = "Failed to load donations.";
    }
}
