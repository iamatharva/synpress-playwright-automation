# Intro

The "Swap" feature in the Mento application is a critical component that allows users to exchange cryptocurrencies directly within the platform. This feature's reliability and security are essential for maintaining user trust and ensuring the smooth operation of the Mento protocol.

# 🧑‍💻 Usage

1. Install dependencies:

```bash
pnpm install
```

2. Start MetaMask Test Dapp in a seprate Terminal [If runing locally]:

```bash
pnpm run serve:test-dapp
```

3. Install Playwright: [If not already installed]

```bash
pnpm exec playwright install
```

4. Either export the variables to your local ~/.zshrc or locally add it to the .env file:

```bash
export SEED_PHRASE=<Your seed phrase>
```

```bash
export WALLET_PASSWORD=<Your wallet password>
```

5. Build cache with our CLI by using a script:

```bash
# You can either build cache in a headed mode:
pnpm run build:cache

# Or in a headless mode:
pnpm run build:cache:headless
```

6. Run Playwright tests as you would normally do:

```bash
# Use one of our scripts:
pnpm run test:playwright:headful
pnpm run test:playwright:headless

### ⚠️ Important note ⚠️

Currently, tests are triggered in a headed mode by default. Add `HEADLESS=true` to run them in a headless mode.
```
