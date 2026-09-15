/*
  Program: Credit Extension Test Suite (Part II)
  Student Name: Shimona KERUA
  Student ID: 241367
  Date: 17 July 2026
*/

const Student = require("../Lab-2/Lab-2_Part-I/Student.js");
const MealBooking = require("../Part I/MealBookings.js");

// In-Memory Database Storage
const bookingDatabase = [];

/**
 * Task 3: Displays complete history for a given Student object
 */
function displayBookingHistory(student, bookings) {
  if (!student || !(student instanceof Student)) {
    console.log("Invalid student provided.");
    return;
  }

  const studentBookings = bookings.filter(
    b => b.student.studentId === student.studentId
  );

  console.log(`========================================`);
  console.log(`          STUDENT INFORMATION          `);
  console.log(`========================================`);
  console.log(`Student ID: ${student.studentId}`);
  console.log(`Student Name: ${student.getFullName()}\n`);

  console.log(`========================================`);
  console.log(`          BOOKING HISTORY              `);
  console.log(`========================================`);

  if (studentBookings.length === 0) {
    console.log("No bookings found.");
    console.log(`========================================\n`);
    return;
  }

  let totalCost = 0;

  studentBookings.forEach((booking, index) => {
    const cost = booking.calculateTotal();
    totalCost += cost;
    console.log(`${index + 1}. ${booking.mealType} - ${booking.mealDate}`);
    console.log(`   Quantity: ${booking.quantity}`);
    console.log(`   Status: ${booking.bookingStatus}`);
    console.log(`   Cost: K${cost.toFixed(2)}\n`);
  });

  console.log(`Total Bookings: ${studentBookings.length}`);
  console.log(`Combined Cost: K${totalCost.toFixed(2)}`);
  console.log(`========================================\n`);
}

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
    return booking;
  } catch (error) {
    console.error(`❌ ERROR: ${error.message}`);
    return null;
  }
}

function main() {
  console.log("\n========================================");
  console.log("    PART II CREDIT EXTENSION TESTS      ");
  console.log("========================================\n");

  // 1. Valid Student Object & Booking Integration Test
  console.log(">>> TEST 1: Creating Valid Student & Bookings");
  const student1 = new Student("DWU2026001", "Maria", "Kila");

  const b1 = processNewBooking(student1, "12 August 2026", "Lunch", 2, "None");
  if (b1) b1.confirmBooking();

  processNewBooking(student1, "13 August 2026", "Dinner", 1, "None");

  // 2. Task 3 Output Test (Booking History Format)
  console.log("\n>>> TEST 2: Student Booking History Output");
  displayBookingHistory(student1, bookingDatabase);

  // 3. Invalid Student Data Test
  console.log(">>> TEST 3: Rejecting Invalid Student Data");
  try {
    new Student("", "John", "Doe");
  } catch (err) {
    console.log(`Successfully caught error: ${err.message}`);
  }

  // 4. Duplicate Booking Prevention Test
  console.log("\n>>> TEST 4: Duplicate Booking Prevention");
  processNewBooking(student1, "12 August 2026", "Lunch", 1, "Extra rice");

  // 5. Task 4 Test (Shared Reference Demonstration)
  console.log("\n>>> TEST 5: Controlled Student Name Update");
  console.log("Updating Maria's last name to 'Kila-Tau' via setter...");
  student1.lastName = "Kila-Tau";

  console.log("\nRe-checking existing booking summary to verify shared reference:");
  console.log(bookingDatabase[0].getSummary());
}

main();