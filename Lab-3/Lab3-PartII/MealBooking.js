/*
  Program: Meal Booking Class (Extended for Task 4 Payment Processing)
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 September 2026
*/

const Student = require("./Student.js");
const DiningAccount = require("./DiningAccount.js");

const MEAL_PRICES = { Breakfast: 10.00, Lunch: 15.00, Dinner: 20.00 };

class MealBooking {
  #student;
  #mealDate;
  #mealType;
  #quantity;
  #dietaryNote;
  #bookingStatus;
  #isPaid;

  constructor(student, mealDate, mealType, quantity, dietaryNote = "None") {
    if (!student || !(student instanceof Student)) {
      throw new Error("A valid Student object reference must be provided.");
    }
    this.#student = student;
    this.mealDate = mealDate;
    this.mealType = mealType;
    this.quantity = quantity;
    this.#dietaryNote = dietaryNote && dietaryNote.trim() !== "" ? dietaryNote.trim() : "None";
    this.#bookingStatus = "Pending";
    this.#isPaid = false;
  }

  get student() { return this.#student; }
  get mealDate() { return this.#mealDate; }
  set mealDate(value) {
    if (!value || value.trim() === "") throw new Error("Meal date is required.");
    this.#mealDate = value.trim();
  }

  get mealType() { return this.#mealType; }
  set mealType(value) {
    if (!value) throw new Error("Meal type is required.");
    const formatted = value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase();
    if (!["Breakfast", "Lunch", "Dinner"].includes(formatted)) {
      throw new Error("Invalid meal type. Must be Breakfast, Lunch, or Dinner.");
    }
    this.#mealType = formatted;
  }

  get quantity() { return this.#quantity; }
  set quantity(value) {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 1) throw new Error("Quantity must be at least 1.");
    this.#quantity = parsed;
  }

  get bookingStatus() { return this.#bookingStatus; }
  get isPaid() { return this.#isPaid; }

  calculateTotal() {
    return (MEAL_PRICES[this.#mealType] || 0) * this.#quantity;
  }

  // Task 4: Polymorphic Payment Integration
  processPayment(diningAccount) {
    if (!diningAccount || !(diningAccount instanceof DiningAccount)) {
      throw new Error("A valid DiningAccount instance must be supplied.");
    }

    if (this.#isPaid || this.#bookingStatus === "Confirmed") {
      console.log(`⚠️ Payment Warning: Booking for ${this.#mealType} on ${this.#mealDate} is already processed and confirmed.`);
      return false;
    }

    const totalCost = this.calculateTotal();
    
    // Calls inherited or overridden payForMeal() polymorphically
    const success = diningAccount.payForMeal(totalCost, `${this.#mealType} booking (${this.#mealDate})`);

    if (success) {
      this.#bookingStatus = "Confirmed";
      this.#isPaid = true;
      console.log(`Payment Status: Successful\nBooking Status: Confirmed`);
    } else {
      this.#bookingStatus = "Pending";
      console.log(`Payment Status: Failed\nBooking Status: Pending`);
    }

    return success;
  }

  getSummary() {
    return (
      `========================================\n` +
      `             MEAL BOOKING               \n` +
      `========================================\n` +
      `Meal: ${this.#mealType}\n` +
      `Quantity: ${this.#quantity}\n` +
      `Total Cost: K${this.calculateTotal().toFixed(2)}\n` +
      `Payment Status: ${this.#isPaid ? "Successful" : "Unpaid"}\n` +
      `Booking Status: ${this.#bookingStatus}\n` +
      `========================================`
    );
  }
}

module.exports = MealBooking;