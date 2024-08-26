# Mento Swap Feature - Test Plan

## Introduction

The "Swap" feature in the Mento application is a critical component that allows users to exchange cryptocurrencies directly within the platform. This feature's reliability and security are essential for maintaining user trust and ensuring the smooth operation of the Mento protocol.

The purpose of this test plan is to thoroughly evaluate the "Swap" feature by identifying key functionalities, potential edge cases, and security considerations. The test plan will focus on ensuring that the feature operates as intended under various conditions, safeguarding against potential issues that could impact the user experience or the integrity of the platform. Through detailed testing, this plan aims to confirm that the "Swap" feature is robust, secure, and user-friendly, providing confidence in its deployment on the Mento platform.

## Test Objectives

### Functional Validation

- Confirm that the "Swap" feature correctly processes transactions, from token selection and amount input to the successful completion of the swap.

### Edge/Negative Case Handling

- Assess the application's behavior under edge cases, such as invalid input amounts, unsupported tokens, and insufficient balances.

### User Experience

- Ensure that the user interface is intuitive, with clear feedback provided at each step, including exchange rate display and transaction confirmation.

### Security Assurance

- Verify that the feature is secure, protecting user data and preventing vulnerabilities such as re-entrancy attacks and unauthorized access.

### Performance Testing

- Evaluate the performance of the "Swap" feature under varying network conditions and transaction volumes, ensuring consistent and reliable operation.

## Key Features of the Swap Functionality

- **Token Selection**: Users can choose a token they wish to exchange (the "from" token) and a token they wish to receive (the "to" token).
- **Real-Time Exchange Rate**: The platform displays the current exchange rate and the estimated amount the user will receive before confirming the swap.
- **Wallet Connectivity**: Users must connect a compatible digital wallet, such as MetaMask, to perform swaps. The platform supports wallet integration for seamless transactions.
- **Transaction Confirmation**: After executing a swap, users can view the transaction status in real-time, receiving immediate feedback on the success or failure of the transaction.

## Scope of the Test for the Swap Feature

### Functional Testing

- Token Selection
- Amount Input
- Exchange Rate Display
- Transaction Execution

### Integration Testing

- Wallet Integration: Testing the interaction between the Mento app and supported digital wallets.
- Blockchain Interaction: Validating the interaction between the app and the Celo blockchain.

### User Experience Testing

- UI/UX Evaluation
- Error Handling

## Testing Environment

- **Test Environment**: All tests will be conducted on the Alfajores testnet and MetaMask testing account.

### Limitations

- **Testnet Only**: Testing is limited to the testnet environment.
- **Non-Exhaustive Security Testing**: While the plan includes basic security checks, it does not cover an exhaustive security audit of the smart contracts or the Mento platform.

## Out of Scope [For Assessment Purposes]

### Security Testing

- **Data Protection**: Verifying that private keys and other sensitive user data are handled securely and are not exposed during the swap process.
- **Vulnerability Assessment**: Checking for common vulnerabilities, such as re-entrancy attacks, and ensuring that the smart contract and swap feature are secure against these threats.

### Performance Testing

- **Load Testing**: Evaluating the performance of the swap feature under varying transaction volumes to ensure it remains responsive and reliable.
- **Latency Testing**: Measuring the time taken to display exchange rates, execute swaps, and confirm transactions, ensuring that performance is within acceptable limits.

## Test Scenarios

### Functional Test Scenarios

1. **Token Selection - Valid Tokens**

   - Description: Verify that users can select a valid "from" token and "to" token from the supported list.
   - Priority: High

2. **Token Selection - Invalid/Unsupported Tokens Mapping**

   - Description: Verify that the application does not allow selection of unsupported tokens conversion as every token is mapped to certain types of allowed token exchanges only.
   - Refer to the acceptable token conversions table below.
   - Priority: High

3. **Amount Input - Valid Amount**

   - Description: Verify that users can input a valid amount for the "from" token and that the correct "to" amount is calculated and displayed.
   - Priority: High

4. **Amount Input - Minimum Allowed Amount**

   - Description: Test the swap functionality when the user inputs the minimum allowed amount.
   - Priority: Medium

5. **Amount Input - Maximum Allowed Amount**

   - Description: Test the swap functionality when the user inputs the maximum allowed amount (or the full balance available).
   - Priority: Medium

6. **Amount Input - Excessive Amount**

   - Description: Verify the application’s response when users input an amount greater than the balance available in their wallet.
   - Priority: High

7. **Exchange Rate Display**

   - Description: Ensure that the exchange rate and expected output amount are accurately displayed before executing the swap.
   - Priority: High

8. **Wallet Connection - Successful Connection**

   - Description: Verify that users can successfully connect their wallet (e.g., MetaMask) to the Mento application.
   - Priority: High

9. **Wallet Connection - No Connection**

   - Description: Verify that the swap functionality is disabled if no wallet is connected, but the user is still able to see the exchange rate.
   - Priority: High

10. **Transaction Execution - Successful Swap**

    - Description: Verify that a swap transaction is successfully executed and that the correct amount of the "to" token is received.
    - Priority: High

11. **Transaction Execution - Failed Swap**

    - Description: Test how the application handles a failed swap transaction due to:
      - Network issues
      - Insufficient gas
      - User cancellation or rejection of the transaction in the wallet prompt.
    - Priority: High

12. **Transaction Confirmation - Status Update**
    - Description: Verify that the transaction status is correctly updated in real-time, showing success, pending, or failure.
    - Priority: High

### User Experience Test Scenarios

1. **UI Responsiveness**

   - Description: Verify that the user interface remains responsive during the swap process, especially under different network conditions.
   - Priority: Medium

2. **Error Messaging**

   - Description: Ensure that clear and accurate error messages are displayed when the swap fails or when invalid data is input.
   - Priority: Medium

3. **Confirmation and Feedback**
   - Description: Verify that users receive immediate feedback upon completing a swap, including confirmation of the transaction.
   - Priority: High

## Test Environment & Test Data

### Blockchain Network

- **Alfajores Testnet**:
  - Utilize the Alfajores testnet, a testing environment for the Celo blockchain, to conduct all swap feature tests.
  - Ensure the testnet is properly configured and accessible for the test account.

### Test Account Setup

- **Creation of Test Account**:
  - Generate a new test account specifically for testing purposes.
  - Obtain test Celo (CELO) and other necessary tokens using the Alfajores faucet.

### Digital Wallet Configuration

- **Supported Wallets**:
  - Use a supported wallet like MetaMask that can interact with the Mento app on the Alfajores testnet.
  - Ensure the wallet is properly configured to connect to the Alfajores network.

### Wallet Integration Testing

- Test the wallet's ability to connect, sign transactions, and handle multiple swap requests.

### Tokens

- Pre-fund the test account with sufficient amounts of these tokens for testing both normal and edge cases.

### Acceptable Swap with From and To Token

| From Token | To Token 1 | To Token 2 | To Token 3 | To Token 4 | To Token 5 |
| ---------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| CELO       | cUSD       | cEUR       | cREAL      | eXOF       |            |
| cUSD       | CELO       | USDS       | USDT       | axIUSDC    | cKES       |
| cEUR       | CELO       | USDS       | axIUSDC    | axIEUROC   |            |
| cREAL      | CELO       | USDS       | axIUSDC    |            |            |
| USDS       | cUSD       | cEUR       | cREAL      |            |            |
| USDT       | cUSD       |            |            |            |            |
| axIUSDC    | cUSD       | cEUR       | cREAL      |            |            |
| axIEUROC   | cEUR       | eXOF       |            |            |            |
| eXOF       | CELO       | axIEUROC   |            |            |            |
| cKES       | cUSD       |            |            |            |            |

## Test Execution Approach

### Manual Testing

- **Scope**: As mentioned above.
- **Tools**: Web browsers (e.g., Chrome with MetaMask extension), direct interaction with the Mento app, and the Celo wallet interface.

### Automated Testing

- **Scope**: High priority key test cases mentioned above to be automated [For assessment purpose automated few of them].
- **Tools**: Synpress, Playwright, Typescript.

## Record Findings

### Improvements:

- **Behaviour**: On https://app.mento.org/ landing page even after getting connected to metamask account unless the balance is loaded and appearing, users trying to click on continue see the `Amount Exceeds Balance` even if they have the balance.
- **Suggestion**: We could disable the From value unless the amount is fetched for connected users

- **Behaviour**: Users cancelling performing swap dialogue still see the metamask extension.
- **Suggestion**: Metamask dialogue should also be closed while user cancels the swap.
