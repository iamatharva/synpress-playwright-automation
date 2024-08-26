# Environment Setup Guide

This guide provides step-by-step instructions to set up the environment for running automated tests with MetaMask and the Mento application. Follow these steps to prepare your environment.

## 1. Create a MetaMask Account

### Install MetaMask

1. Download and install the MetaMask extension for your browser (Chrome).
2. After installation, click on the MetaMask extension icon in your browser.

### Create a New MetaMask Account

1. **Get Started**: Click on the "Get Started" button.
2. **Create a Wallet**: Select "Create a Wallet."
3. **Create a Password**: Enter a strong password and click "Create."
4. **Secure Your Wallet**: Save your Secret Recovery Phrase (Seed Phrase) securely. This phrase is crucial for account recovery.
5. **Confirm Seed Phrase**: Confirm the Seed Phrase as instructed by MetaMask.
6. **Account Created**: Your MetaMask wallet is now set up.

## 2. Fund Your Account with Test CELO Tokens

### Switch to the Alfajores Testnet

1. Click on the network dropdown at the top of the MetaMask extension.
2. Select "Custom RPC" or "Add Network."
3. Enter the following Alfajores Testnet details:
   - **Network Name**: Alfajores Testnet
   - **New RPC URL**: https://alfajores-forno.celo-testnet.org
   - **Chain ID**: 44787
   - **Currency Symbol**: CELO
   - **Block Explorer URL**: https://alfajores-blockscout.celo-testnet.org

4. Click "Save" to add the Alfajores Testnet to your MetaMask wallet.

### Get Test CELO Tokens

1. Go to the [Alfajores Faucet](https://celo.org/developers/faucet).
2. Copy your MetaMask wallet address.
3. Paste your address into the faucet and click "Get started."
4. The faucet will send you 10 CELO tokens. Wait for the transaction to complete.
5. Ensure you have at least 1 CELO in your wallet by checking your balance in MetaMask.

## 3. Configure Environment Variables

To securely manage sensitive information, you'll need to configure environment variables. These variables include your MetaMask Seed Phrase and Wallet Password.

### Find Your MetaMask Seed Phrase and Wallet Password

1. **Seed Phrase (Secret Recovery Phrase)**:
   - Open MetaMask.
   - Click on the account profile icon (top right corner).
   - Select "Settings" > "Security & Privacy."
   - Click "Reveal Secret Recovery Phrase."
   - Enter your MetaMask password to view your Seed Phrase. **Do not share this with anyone.**
   
2. **Wallet Password**:
   - This is the password you created when setting up your MetaMask wallet.

### Add Variables to `.env` File

1. In your project's root directory, create a `.env` file if it doesn't exist.
2. Add the following environment variables to the `.env` file:

   ```env
   SEED_PHRASE="your-12-word-seed-phrase-here"
   WALLET_PASSWORD="your-metamask-password-here"
