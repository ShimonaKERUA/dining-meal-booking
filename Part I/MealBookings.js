/*
  Program: Dining Meal Booking Feature
  Student Name:Shimona KERUA
  Student ID: 241367
  Date: 17 July 2026
  Description: A JavaScript program on classes,
  objects, constructors, private fields and methods.
*/

class MealBooking {
  // 1. Declare Private Fields
  #studentId;
  #studentName;
  #mealDate;
  #mealType;
  #quantity;
  #dietaryNote;
  #bookingStatus;

  // 2. Constructor
  constructor({ studentId, studentName, mealDate, mealType, quantity, dietaryNote }) {
    this.#studentId = studentId;
    this.#studentName = studentName;
    this.#mealDate = mealDate;
    this.#mealType = mealType;
    this.#quantity = quantity;
    this.#dietaryNote = dietaryNote || "None";
    this.#bookingStatus = "Pending"; // Default assignment
  }

  // 3. Getters and Setters
  get studentId() { return this.#studentId; }
  set studentId(value) { this.#studentId = value; }

  get studentName() { return this.#studentName; }
  set studentName(value) { this.#studentName = value; }

  get mealDate() { return this.#mealDate; }
  set mealDate(value) { this.#mealDate = value; }

  get mealType() { return this.#mealType; }
  set mealType(value) { this.#mealType = value; }

  get quantity() { return this.#quantity; }
  set quantity(value) { 
    if (value > 0) {
      this.#quantity = value; 
    } else {
      console.log("Quantity must be greater than 0.");
    }
  }

  get dietaryNote() { return this.#dietaryNote; }
  set dietaryNote(value) { this.#dietaryNote = value; }

  get bookingStatus() { return this.#bookingStatus; }
  set bookingStatus(value) { this.#bookingStatus = value; }

  // 4. Methods
  calculateTotal() {
    // Arbitrary baseline prices assigned based on meal tier selection
    let pricePerMeal = 10.00; 
    
    const type = this.#mealType.toLowerCase();
    if (type === "breakfast") pricePerMeal = 8.50;
    else if (type === "lunch") pricePerMeal = 12.00;
    else if (type === "dinner") pricePerMeal = 15.00;

    return pricePerMeal * this.#quantity;
  }

  getSummary() {
    return `
=== Booking Summary ===
Status: [${this.#bookingStatus}]
Student: ${this.#studentName} (ID: ${this.#studentId})
Details: ${this.#quantity}x ${this.#mealType} on ${this.#mealDate}
Dietary Notes: ${this.#dietaryNote}
=======================`;
  }
}

// Export the class to allow usage within DiningApp.js
module.exports = MealBooking;
