
const City = require("../app/model/cityModel");
// Seed Cities
exports.seedCities = async () => {
  try {
    // Updated seed data
    const cities = [
      { name: "Toronto", region: "York" },
      { name: "Mississauga", region: "Peel" },
      { name: "Brampton", region: "Peel" },
      { name: "Caledon", region: "Peel" },
      { name: "Vaughan", region: "York" },
      { name: "Richmond Hill", region: "York" },
      { name: "Markham", region: "York" },
      { name: "Aurora", region: "York" },
      { name: "Newmarket", region: "York" },
      { name: "Whitchurch-Stouffville", region: "York" },
      { name: "East Gwillimbury", region: "York" },
      { name: "Georgina", region: "York" },
      { name: "Pickering", region: "Durham" },
      { name: "Ajax", region: "Durham" },
      { name: "Whitby", region: "Durham" },
      { name: "Oshawa", region: "Durham" },
      { name: "Clarington", region: "Durham" },
      { name: "Scugog", region: "Durham" },
      { name: "Uxbridge", region: "Durham" },
      { name: "Brock", region: "Durham" },
      { name: "Oakville", region: "Halton" },
      { name: "Burlington", region: "Halton" },
      { name: "Milton", region: "Halton" },
      { name: "Halton Hills", region: "Halton" },
    ];
   

    // Check if cities are already seeded
    const existingCities = await City.countDocuments();
    if (existingCities > 0) {
      console.log("Cities already seeded!");
      return;
    }

    // Insert seed data into the database
    await City.insertMany(cities);

    console.log("Cities seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding cities:", err);
    process.exit(1);
  }
};