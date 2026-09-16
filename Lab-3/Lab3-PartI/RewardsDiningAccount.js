
/*
  Program: Rewards Dining Account Subclass (Part 1)
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 September 2026
*/

const DiningAccount = require("./DiningAccount.js");

class RewardsDiningAccount extends DiningAccount {
  #rewardRate;

  // Constructor Chaining using super()
  constructor(accountNumber, openingBalance = 0, rewardRate = 2.5) {
    super(accountNumber, openingBalance);
    this.rewardRate = rewardRate;
  }

  get rewardRate() {
    return this.#rewardRate;
  }

  set rewardRate(value) {
    const rate = parseFloat(value);
    if (isNaN(rate) || rate < 0) {
      throw new Error("Reward rate must be a non-negative number.");
    }
    this.#rewardRate = rate;
  }

  calculateReward() {
    return (this.getBalance() * this.#rewardRate) / 100;
  }

  applyReward() {
    const rewardEarned = this.calculateReward();
    if (rewardEarned > 0) {
      this.deposit(rewardEarned, `Reward bonus applied (${this.#rewardRate}%)`);
    }
    return rewardEarned;
  }

  // Method Overriding
  displayAccountSummary() {
    return (
      `========================================\n` +
      `        REWARDS DINING ACCOUNT          \n` +
      `========================================\n` +
      `Account Number: ${this.accountNumber}\n` +
      `Reward Rate: ${this.#rewardRate.toFixed(1)}%\n` +
      `Current Balance: K${this.getBalance().toFixed(2)}\n` +
      `========================================`
    );
  }
}

module.exports = RewardsDiningAccount;