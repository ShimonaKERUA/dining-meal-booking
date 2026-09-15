/*
  Program: Dining Meal Booking Class
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 July 2026
*/

// Step out of 'Part I' and navigate into 'Lab-2/Lab-2_Part-I/Student.js'
const Student = require("../Lab-2/Lab-2_Part-I/Student.js");

// Standard Meal Prices in PGK
const MEAL_PRICES = {
  Breakfast: 10.00,
  Lunch: 15.00,
  Dinner: 20.00
};

class MealBooking {
  #student;
  #mealDate;
  #mealType;
  #quantity;
  #dietaryNote;
  #bookingStatus;

  constructor(student, mealDate, mealType, quantity, dietaryNote = "None") {
    // Verify valid Student object reference
    if (!student || !(student instanceof Student)) {
      throw new Error("A valid Student object reference must be provided.");
    }
    this.#student = student;

    this.mealDate = mealDate;
    this.mealType = mealType;
    this.quantity = quantity;
    this.#dietaryNote = dietaryNote && dietaryNote.trim() !== "" ? dietaryNote.trim() : "None";
    this.#bookingStatus = "Pending";
  }

  // --- Getters & Setters ---
  get student() {
    return this.#student;
  }

  get mealDate() {
    return this.#mealDate;
  }

  set mealDate(value) {
    if (!value || value.trim() === "") {
      throw new Error("Meal date is required.");
    }
    this.#mealDate = value.trim();
  }

  get mealType() {
    return this.#mealType;
  }

  set mealType(value) {
    if (!value) throw new Error("Meal type is required.");
    const formattedType = value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase();
    if (!["Breakfast", "Lunch", "Dinner"].includes(formattedType)) {
      throw new Error("Invalid meal type. Must be Breakfast, Lunch, or Dinner.");
    }
    this.#mealType = formattedType;
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(value) {
    const parsedQty = parseInt(value, 10);
    if (isNaN(parsedQty) || parsedQty < 1) {
      throw new Error("Quantity must be a valid number of at least 1.");
    }
    this.#quantity = parsedQty;
  }

  get dietaryNote() {
    return this.#dietaryNote;
  }

  set dietaryNote(value) {
    this.#dietaryNote = value;
  }

  get bookingStatus() {
    return this.#bookingStatus;
  }

  set bookingStatus(value) {
    this.#bookingStatus = value;
  }

  // --- Status Modifiers ---
  confirmBooking() {
    this.#bookingStatus = "Confirmed";
  }

  cancelBooking() {
    this.#bookingStatus = "Cancelled";
  }

  // --- Core Methods ---
  calculateTotal() {
    const unitPrice = MEAL_PRICES[this.#mealType] || 0;
    return unitPrice * this.#quantity;
  }

  getSummary() {
    return `========================================
          BOOKING RECEIPT
========================================
Student: ${this.#student.getFullName()} (${this.#student.studentId})
Meal: ${this.#mealType} x ${this.#quantity}
Date: ${this.#mealDate}
Dietary note: ${this.#dietaryNote}
Status: ${this.#bookingStatus}
Total cost: K${this.calculateTotal().toFixed(2)}
========================================`;
  }
}

module.exports = MealBooking;