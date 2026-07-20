/*
  Program: Dining Meal Booking Feature
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 July 2026
  Description: A JavaScript program on classes,
  objects, constructors, private fields and methods.
*/

// Import the MealBooking class from File 1
const MealBooking = require("./MealBooking.js");

// 1. Create a new instance (Object) of the MealBooking class
const studentBooking = new MealBooking({
  studentId: "STU98765",
  studentName: "Alex Mercer",
  mealDate: "2026-07-22",
  mealType: "Dinner",
  quantity: 2,
  dietaryNote: "Gluten-Free"
});

// 2. Display the initial setup using the summary method
console.log("--- Initial Registration State ---");
console.log(studentBooking.getSummary());
console.log(`Calculated Cost: $${studentBooking.calculateTotal().toFixed(2)}`);

// 3. Demonstrate using a setter to safely change values externally
console.log("\n--- Simulating Update via Setters ---");
studentBooking.quantity = 3;            // Modifying private quantity field
studentBooking.bookingStatus = "Confirmed"; // Modifying private status field

// 4. Call methods again to see updated results
console.log(studentBooking.getSummary());
console.log(`Updated Calculated Cost: $${studentBooking.calculateTotal().toFixed(2)}`);
