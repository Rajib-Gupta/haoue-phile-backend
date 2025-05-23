const LeaseCatagory = require("../app/model/leaseCatagoryModel");

// Seed data
const categories = [
  {
    name: "All Residential",
    subcategories: [
      {
        name: "House",
        subcategories: [
          { name: "Detached" },
          { name: "Semi Detached" },
          { name: "Townhouse" },
          { name: "Link" },
        ],
      },
      {
        name: "Condo",
        subcategories: [
          { name: "Apartment" },
          { name: "Detached (C)" },
          { name: "Semi Detached (C)" },
          { name: "Townhouse (C)" },
          { name: "Parking & Locker" },
        ],
      },
      {
        name: "Recreational",
        subcategories: [{ name: "Cottage" }, { name: "Mobile/Trailer" }],
      },
      {
        name: "Land",
        subcategories: [{ name: "Vacant Land" }],
      },
    ],
  },
  {
    name: "Commercial",
    subcategories: [
      { name: "All Commercial" },
      { name: "Office" },
      { name: "Retail" },
      { name: "Industrial" },
      { name: "Investment" },
      { name: "Sale of Business" },
      { name: "Store with Apt/Office" },
    ],
  },
];

// Insert seed data
exports.seedDatabase = async () => {
  try {
    // Check if categories are already seeded
    const existingCatagories = await LeaseCatagory.countDocuments();
    if (existingCatagories > 0) {
      console.log("Lease Categories already seeded!");
      return;
    }
    // Clear the existing categories
    await LeaseCatagory.deleteMany();
    console.log("Existing categories cleared!");

    // Insert new categories
    await LeaseCatagory.insertMany(categories);
    console.log("Categories seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};
