import { Page } from "@playwright/test";
import { LandingPage } from "../pageObjects/landingPage";

export async function waitForValueToBeGreaterThanZero(
  page: Page,
  timeout: number,
  interval: number,
) {
  let landingPage = new LandingPage(page);
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const value = await landingPage.getAttributeValue();
    if (value !== null && parseFloat(value) > 0) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
  throw new Error(
    "Value did not become greater than 0 within the timeout period",
  );
}

export async function extractFullAmountNumber(input: string): Promise<number> {
  return await new Promise((resolve, reject) => {
    try {
      const match = input.match(/[-+]?[0-9]*\.?[0-9]+/);
      if (match) {
        const extractedNumber = parseFloat(match[0]);
        resolve(extractedNumber);
      } else {
        reject(new Error("No number found in the string"));
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function retry<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed: ${error}`);
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(`Operation failed after ${retries} attempts`);
      }
    }
  }
  throw new Error("Retry logic failed to execute");
}
