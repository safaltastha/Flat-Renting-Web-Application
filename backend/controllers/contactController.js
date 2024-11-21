const { Contact } = require("../models");

// Controller function to save contact form data
exports.submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, message, userId } = req.body;

    // Validation (optional)
    if (!firstName || !lastName || !message ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new Contact entry in the database with userId
    const newContact = await Contact.create({
      firstName,
      lastName,
      message,
      userId,
    });

    res.status(201).json({
      message: "Contact form submitted successfully.",
      data: newContact,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
