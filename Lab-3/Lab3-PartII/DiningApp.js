/*
  Program: Part 2 Comprehensive Demonstration Runner
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 September 2026
*/

const Student = require("./Student.js");
const MealBooking = require("./MealBooking.js");
const DiningAccount = require("./DiningAccount.js");
const RewardsDiningAccount = require("./RewardsDiningAccount.js");
const CreditDiningAccount = require("./CreditDiningAccount.js");

function main() {
  console.log("\n========================================");
  console.log("   DWU DINING SERVICES SYSTEM (LAB 3)   ");
  console.log("========================================\n");

  // --- Task 2: Demonstration of Polymorphism ---
  console.log(">>> DEMONSTRATION 1: Polymorphic Array Processing");
  const accounts = [
    new DiningAccount("DA100", 250.00),
    new RewardsDiningAccount("RA200", 500.00, 2.5),
    new CreditDiningAccount("CA300", 100.00, 300.00)
  ];

  accounts.forEach(acc => {
    console.log(acc.displayAccountSummary());
  });

  // --- Task 3 & 4: Integrated Booking & Payment Workflow ---
  console.log("\n>>> DEMONSTRATION 2: Account Assignment & Meal Booking Payment");
  
  const student = new Student("DWU2026001", "Maria", "Kila");
  const rewardsAccount = new RewardsDiningAccount("RA001", 100.00, 2.5);
  student.assignDiningAccount(rewardsAccount);

  console.log(`========================================`);
  console.log(`          STUDENT DINING ACCOUNT        `);
  console.log(`========================================`);
  console.log(`Student: ${student.getFullName()}`);
  console.log(`Student ID: ${student.studentId}`);
  console.log(`Account Type: ${student.diningAccount.constructor.name}`);
  console.log(`Account Number: ${student.diningAccount.accountNumber}`);
  console.log(`Opening Balance: K${student.diningAccount.getBalance().toFixed(2)}\n`);

  const booking = new MealBooking(student, "12 August 2026", "Dinner", 2); // K40.00

  console.log(`========================================`);
  console.log(`             MEAL BOOKING               `);
  console.log(`========================================`);
  console.log(`Meal: ${booking.mealType}`);
  console.log(`Quantity: ${booking.quantity}`);
  console.log(`Total Cost: K${booking.calculateTotal().toFixed(2)}`);

  booking.processPayment(student.diningAccount);
  console.log(`Remaining Balance: K${student.diningAccount.getBalance().toFixed(2)}\n`);

  // --- Task 4 Verification: Duplicate Payment Prevention ---
  console.log(">>> DEMONSTRATION 3: Duplicate Payment Prevention");
  booking.processPayment(student.diningAccount);

  // --- Task 1 Verification: Credit Account Operations ---
  console.log("\n>>> DEMONSTRATION 4: Credit Account Payment Beyond Zero");
  const creditAcct = new CreditDiningAccount("CA001", 1000.00, 500.00);
  console.log(creditAcct.displayAccountSummary());
  
  console.log("Attempting payment of K1,500.00 (within balance + credit limit)...");
  creditAcct.payForMeal(1500.00, "Catering Event Payment");
  
  console.log("\nAttempting further payment of K100.00 (exceeds credit limit)...");
  creditAcct.payForMeal(100.00, "Snack purchase");

  // --- Task 5: Transaction History Output ---
  console.log(`\n========================================`);
  console.log(`          TRANSACTION HISTORY           `);
  console.log(`========================================`);
  const history = student.diningAccount.getTransactions();
  history.forEach((tx, idx) => {
    console.log(`${idx + 1}. ${tx.type} - K${tx.amount.toFixed(2)}`);
    console.log(`   Description: ${tx.description}`);
    console.log(`   Balance: K${tx.balanceAfter.toFixed(2)}\n`);
  });
  console.log(`Total Transactions: ${history.length}`);
  console.log(`========================================\n`);
}

main();