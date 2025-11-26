# 🚀 Quick Start Guide

## Get Running in 5 Minutes!

### Step 1: Get WalletConnect Project ID (2 minutes)

1. Visit: https://cloud.walletconnect.com
2. Click "Sign In" → Connect with GitHub/Email
3. Create New Project → Name it "CodeSync"
4. Copy the **Project ID**

### Step 2: Update Configuration (30 seconds)

Open `client/src/lib/wagmi.ts` and replace:

```typescript
projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
```

With your actual Project ID:

```typescript
projectId: 'abc123def456...',
```

### Step 3: Install & Run (2 minutes)

```bash
# Install dependencies (if not done)
npm install

# Start the application
npm run dev
```

### Step 4: Setup Wallet (1 minute)

1. Install [MetaMask](https://metamask.io) browser extension
2. Create/Import wallet
3. Switch to **Sepolia Testnet**:
   - Open MetaMask
   - Click network dropdown (top-left)
   - Enable "Show test networks" in settings
   - Select "Sepolia"
4. Get free test ETH: https://sepoliafaucet.com

### Step 5: Test It Out! 🎉

1. Open http://localhost:5000
2. Click **"Connect Wallet"** in header
3. Approve connection in MetaMask
4. Click **"New Project"** → Create a project
5. Open the editor
6. Click **"Save to IPFS"** button
7. Sign the message in MetaMask
8. ✅ Your code is now on IPFS!

## 🎯 What You Can Do Now

✅ Connect Ethereum wallet (Sepolia testnet)  
✅ Create projects and write code  
✅ Save projects to IPFS (decentralized storage)  
✅ Get permanent IPFS CID for each project  
✅ Share projects via IPFS gateway URL  
✅ Cryptographically prove project ownership  

## 🎨 Features Available

- **Monaco Editor** - Full VS Code-like editing experience
- **File Tree** - Organize your project files
- **Terminal Panel** - View build output
- **Wallet Authentication** - Secure access via signatures
- **IPFS Storage** - Permanent, decentralized storage
- **Shareable Links** - Share via IPFS gateway

## 🔍 Testing the Web3 Features

### Test Wallet Connection
1. Click "Connect Wallet"
2. Approve in MetaMask
3. Should see wallet address in header

### Test IPFS Upload
1. Open any project in editor
2. Click "Save to IPFS" (green button)
3. Review files to upload
4. Click "Upload to IPFS"
5. Sign message in MetaMask
6. See success with CID and URL
7. Click URL to view on IPFS!

### Test Project Persistence
1. Save a project to IPFS
2. Copy the CID (content identifier)
3. Visit: `https://w3s.link/ipfs/YOUR_CID`
4. Your files are live on IPFS!

## ⚠️ Important Notes

### Free Tier Limitations
- web3.storage is free but has rate limits
- Projects without account may not persist forever
- For production, create web3.storage account

### Sepolia Testnet
- Use Sepolia, NOT Ethereum mainnet
- Test ETH has no real value
- Safe to experiment

### Signature Prompts
- MetaMask will ask you to sign messages
- This proves you own the wallet
- No gas fees for signing
- Required for security

## 🆘 Common Issues

**"Wrong network"**
→ Switch MetaMask to Sepolia testnet

**"Connect wallet first"**  
→ Click "Connect Wallet" button in header

**"Upload failed"**  
→ Make sure you signed the MetaMask prompt

**"No test ETH"**  
→ Visit https://sepoliafaucet.com (you need a tiny amount, just for identity)

## 🎓 Understanding the Flow

```
┌─────────────────────────────────────────┐
│ 1. User writes code in editor          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 2. Clicks "Save to IPFS"                │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 3. MetaMask prompts for signature       │
│    (proves wallet ownership)            │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 4. Files uploaded to IPFS network       │
│    Returns CID (content identifier)     │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 5. Backend stores: CID + Wallet + Sig   │
│    Creates permanent record             │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 6. Share IPFS URL with anyone!          │
│    Files are now on decentralized web   │
└─────────────────────────────────────────┘
```

## 🎉 You're All Set!

Your decentralized code collaboration tool is ready. Start building the future of collaborative coding on Web3!

---

**Next Steps:**
- Read full documentation: `WEB3_SETUP.md`
- Customize the theme
- Add more features
- Deploy to production
