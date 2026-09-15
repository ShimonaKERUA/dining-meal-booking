/**
 * IS305 Lab 2 - Part 1
 * File Name: Student.js
 * Description: Defines the Student class with private fields, accessors, 
 * constructor validation, and output methods.
 */

class Student {
    // Private fields
    #studentId;
    #firstName;
    #lastName;

    /**
     * Constructor accepts student ID, first name, and last name.
     * Uses setters to enforce validation rules during instantiation.
     */
    constructor(studentId, firstName, lastName) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // --- Getters and Setters ---

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

    // --- Required Methods ---

    /**
     * Returns the student's first name and last name as one value.
     * @returns {string} Full Name
     */
    getFullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    /**
     * Formats and returns the student ID and full name matching the Part 1 expected output.
     * @returns {string} Formatted output string
     */
    displayInfo() {
        return `========================================\n` +
               `             STUDENT DETAILS            \n` +
               `========================================\n` +
               `Student ID: ${this.#studentId}\n` +
               `Student Name: ${this.getFullName()}\n` +
               `========================================`;
    }
}

module.exports = Student;