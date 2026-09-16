/*
  Program: Credit Dining Account Subclass (Part 2)
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 September 2026
*/

const DiningAccount = require("./DiningAccount.js");

class CreditDiningAccount extends DiningAccount {
  #creditLimit;

  // Constructor chaining via super()
  constructor(accountNumber, openingBalance = 0, creditLimit = 500) {
    super(accountNumber, openingBalance);
    this.creditLimit = creditLimit;
  }

  get creditLimit() {
    return this.#creditLimit;
  }

  set creditLimit(value) {
    const limit = parseFloat(value);
    if (isNaN(limit) || limit < 0) {
      throw new Error("Credit limit must be a non-negative number.");
    }
    this.#creditLimit = limit;
  }

  // Method Overriding with Credit Limit validation
  payForMeal(amount, description = "Meal Payment") {
    const paymentAmt = parseFloat(amount);
    if (isNaN(paymentAmt) || paymentAmt <= 0) {
      throw new Error("Meal payment amount must be greater than zero.");
    }

    const currentBal = this.getBalance();
    const availableFunds = currentBal + this.#creditLimit;

    if (paymentAmt > availableFunds) {
      console.log(`❌ Payment Rejected: Amount K${paymentAmt.toFixed(2)} exceeds available limit (Balance: K${currentBal.toFixed(2)}, Credit Limit: K${this.#creditLimit.toFixed(2)}).`);
      return false;
    }

    // Safely update balance below zero via protected base helper
    this._adjustBalance(-paymentAmt, "Meal Payment (Credit)", description);
    console.log(`Payment successful. Updated Balance: K${this.getBalance().toFixed(2)}`);
    return true;
  }

  displayAccountSummary() {
    return (
      `========================================\n` +
      `         CREDIT DINING ACCOUNT          \n` +
      `========================================\n` +
      `Account Number: ${this.accountNumber}\n` +
      `Credit Limit: K${this.#creditLimit.toFixed(2)}\n` +
      `Current Balance: K${this.getBalance().toFixed(2)}\n` +
      `========================================`
    );
  }
}

module.exports = CreditDiningAccount;