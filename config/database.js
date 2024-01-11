const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connection successful")

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    console.log(data);

    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();
    console.log(catData);

    global.food_items = data;
    global.foodCategory = catData;
    
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
}

module.exports = dbConnect;
