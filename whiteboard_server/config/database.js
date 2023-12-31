// config/database.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbjz2.mongodb.net/whiteboard?retryWrites=true&w=majority`,
      {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        //   useCreateIndex: true,
        //   useFindAndModify: false
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
