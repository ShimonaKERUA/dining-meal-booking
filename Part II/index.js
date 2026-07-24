/*
  Program: Dining Meal Booking Feature
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 July 2026
  Description: A JavaScript program on classes,
  objects, constructors, private fields and methods.
*/


const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

// Standard Meal Prices in Papua New Guinean Kina (PGK)
const MEAL_PRICES = {
  Breakfast: 10.00,
  Lunch: 15.00,
  Dinner: 20.00
};

class MealBooking {
  constructor(studentId, studentName, mealDate, mealType, quantity, dietaryNote = 'None') {
    this.studentId = studentId ? studentId.trim() : '';
    this.studentName = studentName ? studentName.trim() : '';
    this.mealDate = mealDate ? mealDate.trim() : '';
    this.mealType = mealType ? mealType.trim() : '';
    this.quantity = parseInt(quantity, 10);
    this.dietaryNote = dietaryNote && dietaryNote.trim() !== '' ? dietaryNote.trim() : 'None';
    this.status = 'Pending';
  }

  // 1. validate(): Reject missing or invalid booking information
  validate() {
    if (!this.studentId) {
      throw new Error('Student ID is required.');
    }
    if (!this.studentName) {
      throw new Error('Student name is required.');
    }
    if (!this.mealDate) {
      throw new Error('Meal date is required.');
    }

    // Capitalize meal type to allow flexible user input (e.g., "lunch" -> "Lunch")
    const formattedType = this.mealType.charAt(0).toUpperCase() + this.mealType.slice(1).toLowerCase();
    if (!['Breakfast', 'Lunch', 'Dinner'].includes(formattedType)) {
      throw new Error('Invalid meal type. Must be Breakfast, Lunch, or Dinner.');
    }
    this.mealType = formattedType;

    if (isNaN(this.quantity) || this.quantity < 1) {
      throw new Error('Quantity must be a valid number of at least 1.');
    }
    return true;
  }

  // 2. calculateTotal(): Return selected meal price multiplied by quantity
  calculateTotal() {
    const unitPrice = MEAL_PRICES[this.mealType] || 0;
    return unitPrice * this.quantity;
  }

  // 3. confirmBooking(): Change status from Pending to Confirmed
  confirmBooking() {
    this.status = 'Confirmed';
  }

  // 4. cancelBooking(): Change status to Cancelled
  cancelBooking() {
    this.status = 'Cancelled';
  }

  // 5. getSummary(): Return a formatted booking receipt
  getSummary() {
    const totalCostFormatted = this.calculateTotal().toFixed(2);
    return `========================================
          BOOKING RECEIPT
========================================
Student: ${this.studentName} (${this.studentId})
Meal: ${this.mealType} x ${this.quantity}
Date: ${this.mealDate}
Dietary note: ${this.dietaryNote}
Status: ${this.status}
Total cost: K${totalCostFormatted}
========================================`;
  }
}

// In-Memory Storage Array (Database restriction compliant)
const bookingDatabase = [];

/**
 * Helper: Check for duplicates (same student ID, meal date, and meal type)
 */
function isDuplicateBooking(newBooking) {
  return bookingDatabase.some(booking =>
    booking.studentId === newBooking.studentId &&
    booking.mealDate === newBooking.mealDate &&
    booking.mealType === newBooking.mealType
  );
}

/**
 * Controller function to validate, check duplicates, and store bookings safely
 */
function processNewBooking(studentId, studentName, mealDate, mealType, quantity, dietaryNote) {
  try {
    const booking = new MealBooking(studentId, studentName, mealDate, mealType, quantity, dietaryNote);

    // Validate inputs
    booking.validate();

    // Prevent duplicates
    if (isDuplicateBooking(booking)) {
      throw new Error(`Duplicate booking detected! Student ${booking.studentId} already has a ${booking.mealType} booking for ${booking.mealDate}.`);
    }

    // Save to array database
    bookingDatabase.push(booking);

    // Display summary receipt
    console.log('\n========================================');
    console.log('         BOOKING CREATED                ');
    console.log(booking.getSummary());
    return booking;
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    return null;
  }
}

/**
 * Interactive Mode: Prompts user via console input (readline/promises)
 */
async function promptInteractiveBooking() {
  const rl = readline.createInterface({ input, output });

  console.log('\n========================================');
  console.log('       DWU DINING MEAL BOOKING          ');
  console.log('========================================\n');

  try {
    const studentId = await rl.question('Student ID: ');
    const studentName = await rl.question('Student name: ');
    const mealDate = await rl.question('Meal date (YYYY-MM-DD): ');
    const mealType = await rl.question('Meal type (Breakfast/Lunch/Dinner): ');
    const quantity = await rl.question('Quantity: ');
    const dietaryNote = await rl.question('Dietary note: ');

    processNewBooking(studentId, studentName, mealDate, mealType, quantity, dietaryNote);
  } finally {
    rl.close();
  }
}

/**
 * Automated Demonstrations for the 3 Required Test Cases
 */
function runRequiredTests() {
  console.log('\n========================================');
  console.log('      RUNNING REQUIRED TEST SUITE       ');
  console.log('========================================');

  console.log('\n>>> TEST 1: Valid Booking');
  processNewBooking('DWU2026001', 'Jason Nakukanai', '2026-07-18', 'Lunch', '2', 'No peanuts');

  console.log('\n>>> TEST 2: Invalid Booking (Invalid Meal Type & Zero Quantity)');
  processNewBooking('DWU2026002', 'Esonia Tribahadad', '2026-07-18', 'Snack', '0', 'None');

  console.log('\n>>> TEST 3: Duplicate Booking Attempt');
  console.log('Attempting duplicate booking for DWU2026001 on 2026-07-18 (Lunch)...');
  processNewBooking('DWU2026001', 'Jason Nakukanai', '2026-07-18', 'Lunch', '1', 'Extra rice');
}

// Main execution point
async function main() {
  // Run the required automated test suite
  runRequiredTests();

  // Note: To test interactive user input in your terminal, uncomment the line below:
  // await promptInteractiveBooking();
}

main();