import "dotenv/config";
import { Page } from "@playwright/test";
import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../wallet-setup/basic.setup";
import { BasePage } from "../pageObjects/basePage";
import { LandingPage } from "../pageObjects/landingPage";

const test = testWithSynpress(metaMaskFixtures(basicSetup));
test.beforeEach(async ({ page }: { page: Page }) => {
  let basePage = new BasePage(page);
  await basePage.openUrl(process.env.URL_UNDER_TEST);
});

const { expect } = test;

test.describe("Swap Functionality", () => {
  test("Verify the application’s response when users input an amount greater than the balance available in their wallet.", async ({
    context,
    page,
    metamaskPage,
    extensionId,
  }) => {
    const metamask = new MetaMask(
      context,
      metamaskPage,
      basicSetup.walletPassword,
      extensionId,
    );
    let landingPage = new LandingPage(page);
    await landingPage.connectMetaMaskWallet(metamask);
    await landingPage.waitForFullBalanceDetailToLoad();
    const extractedValue = await landingPage.getFullBalanceValue();
    const newValue = extractedValue + 1;
    await landingPage.fillAmountIn(newValue.toString());
    await landingPage.waitForConvertedValueToAppear(page);
    await landingPage.invokeContinueButton();
    const amountExceedsBalanceText =
      await landingPage.amountExceedsBalanceText();
    await expect(amountExceedsBalanceText).toBe("Amount exceeds balance");
  });
  test("Test how the application handles a failed swap transaction: User Cancel or Reject the transactions in wallet prompt.", async ({
    context,
    page,
    metamaskPage,
    extensionId,
  }) => {
    const metamask = new MetaMask(
      context,
      metamaskPage,
      basicSetup.walletPassword,
      extensionId,
    );
    let landingPage = new LandingPage(page);

    await landingPage.connectMetaMaskWallet(metamask);
    await landingPage.waitForFullBalanceDetailToLoad();
    await landingPage.fillAmountIn("0.001");
    await landingPage.waitForConvertedValueToAppear(page);
    await landingPage.invokeContinueButton();
    await landingPage.invokeSwapButton();
    await landingPage.confirmAndApproveTransactionOnMetaMask(metamask);
    await landingPage.rejectTransaction(metamask);

    const swapUnsuccessfulText =
      await landingPage.waitForUnsuccessfulTransactionAlertToaster();
    await expect(swapUnsuccessfulText).toBe(
      "Unable to execute swap transaction",
    );
  });
  test('Verify that a swap transaction is successfully executed and that the correct amount of the "to" token is received.', async ({
    context,
    page,
    metamaskPage,
    extensionId,
  }) => {
    const metamask = new MetaMask(
      context,
      metamaskPage,
      basicSetup.walletPassword,
      extensionId,
    );
    let landingPage = new LandingPage(page);

    await landingPage.connectMetaMaskWallet(metamask);
    await landingPage.waitForFullBalanceDetailToLoad();
    await landingPage.fillAmountIn("0.001");
    await landingPage.waitForConvertedValueToAppear(page);
    await landingPage.invokeContinueButton();
    await landingPage.invokeSwapButton();
    await landingPage.confirmAndApproveTransactionOnMetaMask(metamask);
    await landingPage.confirmTransactionOnMetaMask(metamask);

    const swapCompleteAlert =
      await landingPage.waitForSwapCompleteAlertToaster();
    await expect(swapCompleteAlert).toBe("Swap Complete! See Details");
  });
});
