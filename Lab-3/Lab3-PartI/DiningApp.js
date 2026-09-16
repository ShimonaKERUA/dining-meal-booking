/*
  Program: Part 1 Demonstration Execution
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 September 2026
*/

const DiningAccount = require("./DiningAccount.js");
const RewardsDiningAccount = require("./RewardsDiningAccount.js");

function main() {
  console.log("========================================");
  console.log("       STANDARD DINING ACCOUNT          ");
  console.log("========================================");

  const stdAccount = new DiningAccount("DA001", 1000.00);
  console.log(`Account Number: ${stdAccount.accountNumber}`);
  console.log(`Opening Balance: K1000.00`);

  stdAccount.deposit(500.00, "Weekly meal allowance");
  console.log(`Deposit: K500.00`);

  console.log(`Meal Payment: K200.00`);
  const success = stdAccount.payForMeal(200.00, "Dinner payment");
  console.log(`Payment Status: ${success ? "Successful" : "Failed"}`);
  console.log(`Final Balance: K${stdAccount.getBalance().toFixed(2)}\n`);

  console.log("========================================");
  console.log("        REWARDS DINING ACCOUNT          ");
  console.log("========================================");

  const rewardsAccount = new RewardsDiningAccount("RA001", 1500.00, 2.5);
  console.log(`Account Number: ${rewardsAccount.accountNumber}`);

  rewardsAccount.deposit(500.00, "Top-up balance");
  console.log(`Balance Before Reward: K${rewardsAccount.getBalance().toFixed(2)}`);
  console.log(`Reward Rate: ${rewardsAccount.rewardRate.toFixed(1)}%`);

  const rewardEarned = rewardsAccount.applyReward();
  console.log(`Reward Earned: K${rewardEarned.toFixed(2)}`);
  console.log(`Final Balance: K${rewardsAccount.getBalance().toFixed(2)}`);
  console.log("========================================");
}

main();