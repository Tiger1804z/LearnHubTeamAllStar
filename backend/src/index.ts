import express from "express";
import progressRoutes from "./routes/progress.routes";

const app = express();
app.use(express.json());

app.use("/api/progress", progressRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
