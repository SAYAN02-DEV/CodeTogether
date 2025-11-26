# CodeSync - Web3 Code Collaboration Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SAYAN02-DEV/CodeTogether)

## 🚀 Deploy to Vercel

### One-Click Deploy

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Add environment variable:
   - `VITE_WALLETCONNECT_PROJECT_ID` - Get from https://cloud.walletconnect.com
4. Deploy!

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your WalletConnect Project ID

# Start dev server
npm run dev
```

## 📦 Build

```bash
npm run build
```

Output will be in `dist/` directory.

## ✨ Features

- 🔐 Wallet-based authentication (Ethereum, Polygon, Arbitrum, Optimism, Base)
- 📦 IPFS decentralized storage
- 🎨 Monaco Editor (VS Code-like)
- ⚡ Real-time collaboration ready
- 🎯 Multi-chain support
- 🔒 Cryptographic access control

## 📚 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Web3**: Wagmi, RainbowKit, ethers.js
- **Storage**: IPFS (web3.storage)
- **Backend**: Express.js
- **UI**: Tailwind CSS, shadcn/ui

## 📖 Documentation

- [Quick Start Guide](./QUICKSTART.md)
- [Web3 Setup](./WEB3_SETUP.md)
- [Architecture](./ARCHITECTURE.md)

## 🤝 Contributing

Pull requests are welcome!

## 📝 License

MIT
