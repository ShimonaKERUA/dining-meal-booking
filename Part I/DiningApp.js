/*
  Program: Dining App Execution (Part I)
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 July 2026
*/

const Student = require("../Lab-2/Lab-2_Part-I/Student.js");
const MealBooking = require("./MealBookings.js");

const bookingDatabase = [];

function isDuplicateBooking(newBooking) {
  return bookingDatabase.some(
    booking =>
      booking.student.studentId === newBooking.student.studentId &&
      booking.mealDate === newBooking.mealDate &&
      booking.mealType === newBooking.mealType
  );
}

function processNewBooking(studentObj, mealDate, mealType, quantity, dietaryNote) {
  try {
    const booking = new MealBooking(studentObj, mealDate, mealType, quantity, dietaryNote);

    if (isDuplicateBooking(booking)) {
      throw new Error(
        `Duplicate booking detected! Student ${studentObj.studentId} already has a ${booking.mealType} booking for ${booking.mealDate}.`
      );
    }

    bookingDatabase.push(booking);
    console.log(booking.getSummary());
    return booking;
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    return null;
  }
}

function main() {
  console.log("\n========================================");
  console.log("      DINING APP INITIALIZATION         ");
  console.log("========================================\n");

  try {
    const student1 = new Student("DWU2026001", "Jason", "Nakukanai");
    processNewBooking(student1, "2026-07-18", "Lunch", 2, "No peanuts");
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

main();