/*
  Program: Student Identity Class
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 July 2026
*/

class Student {
  #studentId;
  #firstName;
  #lastName;

  constructor(studentId, firstName, lastName) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // --- Getters & Setters ---
  get studentId() {
    return this.#studentId;
  }

  set studentId(value) {
    if (!value || value.trim() === "") {
      throw new Error("Student ID cannot be empty.");
    }
    this.#studentId = value.trim();
  }

  get firstName() {
    return this.#firstName;
  }

  set firstName(value) {
    if (!value || value.trim() === "") {
      throw new Error("First name cannot be empty.");
    }
    this.#firstName = value.trim();
  }

  get lastName() {
    return this.#lastName;
  }

  set lastName(value) {
    if (!value || value.trim() === "") {
      throw new Error("Last name cannot be empty.");
    }
    this.#lastName = value.trim();
  }

  // --- Methods ---
  getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  displayInfo() {
    return `========================================\n` +
           `          STUDENT INFORMATION          \n` +
           `========================================\n` +
           `Student ID: ${this.#studentId}\n` +
           `Student Name: ${this.getFullName()}\n` +
           `========================================`;
  }
}

module.exports = Student;