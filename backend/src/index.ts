import express from "express";
import userRoutes from "./routes/user.routes";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});