# CodeSync Web3 - Decentralized Code Collaboration

A Web3-powered collaborative coding platform with IPFS storage and Ethereum wallet authentication.

## 🌟 Features

- ✅ **Ethereum Wallet Authentication** - Connect via MetaMask/WalletConnect
- ✅ **IPFS Storage** - Decentralized file storage using web3.storage
- ✅ **Wallet Signatures** - Cryptographic proof of project ownership
- ✅ **Access Control** - Signature-based project access verification
- ✅ **Real-time Editor** - Monaco editor integration
- ✅ **Beautiful UI** - Glassmorphic cyberpunk theme

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- MetaMask browser extension (or any Ethereum wallet)
- Sepolia testnet ETH (get from [Sepolia Faucet](https://sepoliafaucet.com/))

### 1. Install Dependencies

```bash
npm install
```

### 2. Get WalletConnect Project ID

1. Go to [https://cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create a new project
3. Copy your Project ID
4. Update `/client/src/lib/wagmi.ts`:

```typescript
projectId: 'YOUR_PROJECT_ID_HERE',
```

### 3. Setup Web3.Storage (IPFS)

The app uses web3.storage (now storacha.network) for free IPFS pinning.

**Option A: Use as Guest (No setup needed)**
- Files are uploaded but may not be permanently pinned
- Good for testing

**Option B: Create Account (Recommended)**
1. Go to [https://console.web3.storage](https://console.web3.storage)
2. Create account and get API token
3. Update the IPFS client initialization in `/client/src/lib/ipfs.ts` if needed

### 4. Run the Application

```bash
# Development mode
npm run dev

# The app will start on http://localhost:5000
```

## 🔧 How It Works

### Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Wallet    │ ───► │   Frontend   │ ───► │    IPFS     │
│  (MetaMask) │      │  (React/TS)  │      │(web3.storage)│
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   Backend    │
                     │ (Express/TS) │
                     └──────────────┘
```

### Workflow

1. **Connect Wallet**
   - User connects Ethereum wallet (MetaMask)
   - RainbowKit handles connection UI
   - App gets wallet address

2. **Create/Edit Project**
   - User writes code in Monaco editor
   - Files are prepared for upload

3. **Save to IPFS**
   - User clicks "Save to IPFS"
   - Wallet prompts for signature (proof of ownership)
   - Files uploaded to IPFS via web3.storage
   - Returns CID (Content Identifier)

4. **Store Metadata**
   - Backend verifies wallet signature
   - Stores: CID, wallet address, project name, signature
   - Creates shareable link

5. **Share & Access**
   - Share IPFS CID or gateway URL
   - Others can view files on IPFS
   - Owner can prove ownership via signature

## 📁 Project Structure

```
client/src/
├── components/
│   ├── web3/
│   │   ├── WalletConnect.tsx      # Wallet connection UI
│   │   └── SaveToIPFSDialog.tsx   # IPFS upload dialog
│   ├── editor/                     # Code editor components
│   └── home/                       # Dashboard components
├── lib/
│   ├── wagmi.ts                    # Web3 configuration
│   └── ipfs.ts                     # IPFS client & utilities
└── hooks/
    └── useWalletAuth.ts            # Wallet authentication hook

server/
└── routes.ts                       # API endpoints for IPFS metadata
```

## 🔐 Security Features

### Wallet Signature Verification

```typescript
// Frontend: User signs message
const message = `CodeSync - Verify ownership: ${address}`;
const signature = await signMessageAsync({ message });

// Backend: Verify signature
const recoveredAddress = ethers.verifyMessage(message, signature);
// Only proceed if recoveredAddress === claimed address
```

### Access Control

- Projects are tied to wallet addresses
- Signature required to upload/modify
- IPFS ensures tamper-proof storage
- Public gateway for read access

## 🌐 API Endpoints

### `POST /api/projects/ipfs`
Save project to IPFS

**Request:**
```json
{
  "projectName": "my-project",
  "cid": "bafybeiabc123...",
  "walletAddress": "0x1234...",
  "signature": "0xabcd...",
  "message": "verification message",
  "fileCount": 5
}
```

**Response:**
```json
{
  "success": true,
  "projectId": "0x1234-1234567890",
  "cid": "bafybeiabc123...",
  "url": "https://w3s.link/ipfs/bafybeiabc123..."
}
```

### `GET /api/projects/wallet/:address`
Get all projects for a wallet

### `GET /api/projects/ipfs/:cid`
Get project metadata by CID

### `POST /api/projects/verify-access`
Verify user has access to project

## 🎨 UI Features

- **Glassmorphic Design** - Modern blur effects
- **Cyberpunk Theme** - Cyan/blue accent colors
- **Responsive Layout** - Mobile-friendly
- **Monaco Editor** - VS Code-like editing
- **RainbowKit** - Beautiful wallet connection

## 🚧 Future Enhancements

- [ ] Collaborative editing with WebSockets
- [ ] NFT-based access tokens
- [ ] IPFS pinning service integration
- [ ] Smart contract for access management
- [ ] Version control on IPFS
- [ ] Team/DAO governance
- [ ] Encrypted private projects
- [ ] IPNS for mutable content

## 🔑 Environment Variables (Optional)

Create `.env` file:

```env
# WalletConnect Project ID
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Web3.Storage API Token (optional)
VITE_WEB3_STORAGE_TOKEN=your_token
```

## 🐛 Troubleshooting

### "Wallet not connected"
- Install MetaMask extension
- Switch to Sepolia testnet
- Refresh page

### "Upload failed"
- Check internet connection
- Verify wallet is connected
- Sign the message prompt

### "Wrong network"
- Open MetaMask
- Switch to Sepolia Testnet
- If not added, use chainlist.org

## 📚 Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Wallet:** Wagmi, RainbowKit, ethers.js
- **Storage:** IPFS via web3.storage
- **UI:** Tailwind CSS, shadcn/ui
- **Editor:** Monaco Editor
- **Backend:** Express, Node.js

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

MIT License - see LICENSE file

## 🙏 Acknowledgments

- [web3.storage](https://web3.storage) - Free IPFS pinning
- [RainbowKit](https://rainbowkit.com) - Wallet connection UI
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [IPFS](https://ipfs.io) - Decentralized storage

---

Built with ❤️ for Web3
