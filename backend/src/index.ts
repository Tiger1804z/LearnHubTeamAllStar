import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import progressRoutes from "./routes/progress.routes";
import pathRoutes from "./routes/path.routes";
import catalogRoutes from "./routes/catalog.routes";
import moduleRoutes from "./routes/module.routes";
import lessonRoutes from "./routes/lessons.routes";
import quizzRoutes from "./routes/quizz.routes";

import dotenv from "dotenv";
dotenv.config();



const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/users", userRoutes);
app.use("/paths", pathRoutes);
app.use("/catalog", catalogRoutes);
app.use("/", moduleRoutes);
app.use("/", lessonRoutes);
app.use("/", quizzRoutes);



app.use("/api/progress", progressRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
