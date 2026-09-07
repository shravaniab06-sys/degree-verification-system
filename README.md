Degree Verification System

A decentralized Blockchain-Based Degree Verification System that enables educational institutions to issue digital degree certificates and allows students, employers, and other authorized users to verify the authenticity of certificates using blockchain technology.

The system uses Ethereum Sepolia for storing degree verification records, IPFS for certificate/document storage, Node.js + Express for backend services, and React + Vite for the frontend.
## 🏗️ System Architecture

┌───────────────────────────────┐
│             User              │
│ Student / Employer /          │
│ Institution                   │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       React Frontend          │
│            Vite               │
└───────────────┬───────────────┘
                │
       ┌────────┴────────┐
       │                 │
       ▼                 ▼
┌──────────────────┐  ┌──────────────────┐
│ Node.js +        │  │    MetaMask      │
│ Express Backend  │  │     Wallet       │
└────────┬─────────┘  └────────┬─────────┘
         │                     │
         ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│      IPFS        │  │ Ethereum Sepolia │
│   Certificate    │  │ Smart Contract   │
│     Storage      │  │                  │
└──────────────────┘  └──────────────────┘
        


| Component          | Technology        | Primary Responsibility                     |
| ------------------ | ----------------- | ------------------------------------------ |
| **Frontend**       | React + Vite      | User interface and application interaction |
| **Backend**        | Node.js + Express | Certificate processing and API services    |
| **Smart Contract** | Solidity          | Store and verify degree records            |
| **Blockchain**     | Ethereum Sepolia  | Decentralized degree verification          |
| **Storage**        | IPFS              | Store certificate documents                |
| **Wallet**         | MetaMask          | Blockchain wallet and transaction signing  |

# Degree Verification System

A blockchain-based system for issuing and verifying academic degrees.

## Technologies

- React + Vite
- Node.js + Express
- Solidity
- Ethereum Sepolia
- IPFS
- MetaMask
- Ethers.js

## 📂 Project Structure


degree-verification-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── contracts/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── blockchain/
│   └── contracts/
│       └── DegreeVerification.sol
│
└── README.md

## Requirements

Install:

- Node.js
- Git
- MetaMask

## 1. Clone

git clone https://github.com/shravaniab06-sys/degree-verification-system.git

cd degree-verification-system

## 2. Backend

cd backend
npm install
node server.js

## 3. Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Open:

http://localhost:5173

## 4. Blockchain

The DegreeVerification contract is deployed on Ethereum Sepolia.

Configure the deployed contract address and ABI in:

frontend/src/contracts/contractConfig.js

## 5. MetaMask

Connect MetaMask and select the Sepolia network.

📄 License

This project is developed for educational and academic purposes.
