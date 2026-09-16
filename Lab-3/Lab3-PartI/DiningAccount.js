/*
  Program: Base Dining Account Class (Part 1 Foundation)
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 September 2026
*/

class DiningAccount {
  #accountNumber;
  #balance;
  #transactions;

  // Simulated Constructor Overloading via Default Parameters
  constructor(accountNumber, openingBalance = 0) {
    this.accountNumber = accountNumber;

    const initialBal = parseFloat(openingBalance);
    if (isNaN(initialBal) || initialBal < 0) {
      throw new Error("Opening balance cannot be negative or invalid.");
    }
    this.#balance = initialBal;
    this.#transactions = [];

    if (this.#balance > 0) {
      this.#recordTransaction("Deposit", this.#balance, "Opening balance");
    }
  }

  // --- Getters & Setters ---
  get accountNumber() {
    return this.#accountNumber;
  }

  set accountNumber(value) {
    if (!value || value.trim() === "") {
      throw new Error("Account number cannot be empty.");
    }
    this.#accountNumber = value.trim();
  }

  getBalance() {
    return this.#balance;
  }

  // Safe copy to preserve encapsulation
  getTransactions() {
    return [...this.#transactions];
  }

  // --- Encapsulated Helper ---
  #recordTransaction(type, amount, description) {
    this.#transactions.push({
      type,
      amount,
      description,
      timestamp: new Date().toLocaleString(),
      balanceAfter: this.#balance
    });
  }

  // Helper method for derived classes to adjust balance cleanly
  _adjustBalance(amount, type, description) {
    this.#balance += amount;
    this.#recordTransaction(type, Math.abs(amount), description);
  }

  // --- Core Methods ---

  // Simulated Method Overloading via Default Parameter
  deposit(amount, description = "Standard Deposit") {
    const depositAmt = parseFloat(amount);
    if (isNaN(depositAmt) || depositAmt <= 0) {
      throw new Error("Deposit amount must be greater than zero.");
    }
    this.#balance += depositAmt;
    this.#recordTransaction("Deposit", depositAmt, description);
    return true;
  }

  payForMeal(amount, description = "Meal Payment") {
    const paymentAmt = parseFloat(amount);
    if (isNaN(paymentAmt) || paymentAmt <= 0) {
      throw new Error("Meal payment amount must be greater than zero.");
    }

    if (this.#balance < paymentAmt) {
      console.log(`❌ Payment Rejected: Insufficient funds in account ${this.#accountNumber}. Required: K${paymentAmt.toFixed(2)}, Available: K${this.#balance.toFixed(2)}.`);
      return false;
    }

    this.#balance -= paymentAmt;
    this.#recordTransaction("Meal Payment", paymentAmt, description);
    console.log(`Payment successful.`);
    return true;
  }

  displayAccountSummary() {
    return (
      `========================================\n` +
      `       STANDARD DINING ACCOUNT          \n` +
      `========================================\n` +
      `Account Number: ${this.#accountNumber}\n` +
      `Current Balance: K${this.#balance.toFixed(2)}\n` +
      `========================================`
    );
  }
}

module.exports = DiningAccount;