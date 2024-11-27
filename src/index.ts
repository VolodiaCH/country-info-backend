import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import countryRoutes from "./routes/countryRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/countries", countryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
