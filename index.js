import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/core/database/index.js";

dotenv.config();
const PORT = process.env.PORT || 3000;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🎯 Server started successfully!`);
        console.log(`📍 Port: ${PORT}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV}`);

    });
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
})