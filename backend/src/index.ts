import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);


app.use("/api/progress", progressRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
