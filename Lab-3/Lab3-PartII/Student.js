/*
  Program: Student Class (Extended for Task 3)
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 September 2026
*/

const DiningAccount = require("./DiningAccount.js");

class Student {
  #studentId;
  #firstName;
  #lastName;
  #diningAccount;

  constructor(studentId, firstName, lastName) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.#diningAccount = null;
  }

  get studentId() { return this.#studentId; }
  set studentId(value) {
    if (!value || value.trim() === "") throw new Error("Student ID cannot be empty.");
    this.#studentId = value.trim();
  }

  get firstName() { return this.#firstName; }
  set firstName(value) {
    if (!value || value.trim() === "") throw new Error("First name cannot be empty.");
    this.#firstName = value.trim();
  }

  get lastName() { return this.#lastName; }
  set lastName(value) {
    if (!value || value.trim() === "") throw new Error("Last name cannot be empty.");
    this.#lastName = value.trim();
  }

  get diningAccount() { return this.#diningAccount; }

  // Task 3: Account Object Composition & Subtype Verification
  assignDiningAccount(account) {
    if (!account || !(account instanceof DiningAccount)) {
      throw new Error("Assigned object must be a valid DiningAccount or child subtype instance.");
    }
    this.#diningAccount = account;
  }

  getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  displayInfo() {
    const acctInfo = this.#diningAccount 
      ? `${this.#diningAccount.accountNumber} (${this.#diningAccount.constructor.name})` 
      : "No Account Assigned";

    return (
      `========================================\n` +
      `          STUDENT INFORMATION           \n` +
      `========================================\n` +
      `Student ID: ${this.#studentId}\n` +
      `Student Name: ${this.getFullName()}\n` +
      `Dining Account: ${acctInfo}\n` +
      `========================================`
    );
  }
}

module.exports = Student;