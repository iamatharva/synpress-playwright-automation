import { expect, Locator, Page, Selectors, test } from "@playwright/test";
import landingSelector from "../selectors/landing.selector";
import { MetaMask } from "@synthetixio/synpress/playwright";
import {
  waitForValueToBeGreaterThanZero,
  extractFullAmountNumber,
  retry,
} from "../utils/jsUtils";

export class LandingPage {
  readonly page: Page;
  readonly connectWalletButton: Locator;
  readonly selectAccount: Locator;
  readonly useFullBalanceTitle: Locator;
  readonly inputFieldAmountIn: Locator;
  readonly inputFieldAmountOut: Locator;
  readonly continueButton: Locator;
  readonly swapButton: Locator;
  readonly alertToasters: Locator;
  readonly amountExccedsBalance: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connectWalletButton = page.locator(
      landingSelector.connectWalletButton,
    );
    this.selectAccount = page.locator(
      landingSelector.connectionPopUp.selectAccount,
    );
    this.useFullBalanceTitle = page.getByTitle(
      landingSelector.useFullBalanceTitleText,
    );
    this.inputFieldAmountIn = page.locator(landingSelector.inputFieldAmountIn);
    this.inputFieldAmountOut = page.locator(
      landingSelector.inputFieldAmountOut,
    );
    this.continueButton = page.locator(landingSelector.continueButton);
    this.swapButton = page.locator(landingSelector.swapPopUp.swapButton);
    this.alertToasters = page.locator(
      landingSelector.notificationToaster.alertToasters,
    );
    this.amountExccedsBalance = page.locator(
      landingSelector.amountExccedsBalance,
    );
  }

  async connectMetaMaskWallet(metamask: MetaMask) {
    await test.step(`Connecting MetaMask account`, async () => {
      await this.connectWalletButton.click();
      await this.selectAccount.click();
      await retry(() => metamask.approveTokenPermission(), 3, 10000);
    });
  }

  async waitForFullBalanceDetailToLoad() {
    await test.step(`Waiting for full balance to load`, async () => {
      await this.useFullBalanceTitle.waitFor({ state: "attached" });
    });
  }

  async getFullBalanceValue(): Promise<number> {
    return await test.step(`Returning full balance text`, async () => {
      let value = await this.useFullBalanceTitle.innerText();
      return (await extractFullAmountNumber(value)) as number;
    });
  }

  async fillAmountIn(amount: string) {
    await test.step(`Filling the amount ${amount}`, async () => {
      await this.inputFieldAmountIn.fill(amount);
    });
  }

  async getAttributeValue(): Promise<string> {
    return await test.step(`Get Attribute Value`, async () => {
      const value = await this.inputFieldAmountOut.getAttribute("value");
      return value as string;
    });
  }

  async waitForConvertedValueToAppear(page: Page) {
    await test.step(`Waiting for the coverted value to appear`, async () => {
      await waitForValueToBeGreaterThanZero(page, 10000, 1000);
    });
  }

  async invokeContinueButton() {
    await test.step(`Continue button has been invoked`, async () => {
      await this.continueButton.waitFor({ state: "attached" });
      await this.continueButton.click();
    });
  }

  async invokeSwapButton() {
    await test.step(`Swap button has been invoked`, async () => {
      await this.swapButton.waitFor({ state: "attached" });
      await this.swapButton.waitFor({ state: "visible" });
      await this.swapButton.click();
    });
  }

  async confirmAndApproveTransactionOnMetaMask(metamask: MetaMask) {
    await test.step(`Confirm and approve the transaction on Metamask extension`, async () => {
      await retry(
        () => metamask.confirmTransactionAndWaitForMining(),
        3,
        10000,
      );
    });
  }

  async confirmTransactionOnMetaMask(metamask: MetaMask) {
    await test.step(`Confirming the transaction on Metamask extension`, async () => {
      await retry(() => metamask.confirmTransaction(), 3, 10000);
    });
  }

  async rejectTransaction(metamask: MetaMask) {
    await test.step(`Rejecting metamask transaction`, async () => {
      await retry(() => metamask.rejectSignature(), 3, 10000);
    });
  }

  async waitForSwapCompleteAlertToaster() {
    return await test.step(`Swap complete alert toaster appeared`, async () => {
      const alerts = await this.alertToasters;
      await alerts
        .locator(landingSelector.notificationToaster.alertTextSwapComplete)
        .waitFor({ state: "visible" });
      const swapCompleteAlert = await alerts
        .locator(landingSelector.notificationToaster.alertTextSwapComplete)
        .textContent();
      return swapCompleteAlert as string;
    });
  }

  async waitForUnsuccessfulTransactionAlertToaster() {
    return await test.step(`Unable to execute swap transaction`, async () => {
      const alerts = await this.alertToasters;
      await alerts
        .locator(
          landingSelector.notificationToaster.alertTextUnableToExecuteSwap,
        )
        .waitFor({ state: "visible" });
      const swapUnsuccessfulText = await alerts
        .locator(
          landingSelector.notificationToaster.alertTextUnableToExecuteSwap,
        )
        .textContent();
      return swapUnsuccessfulText as string;
    });
  }

  async amountExceedsBalanceText(): Promise<string> {
    return await test.step(`Amount Exceed balance text appeared`, async () => {
      await this.amountExccedsBalance.waitFor({ state: "attached" });
      return (await this.amountExccedsBalance.innerText()) as string;
    });
  }
}
