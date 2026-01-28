import express from "express";
import cors from "cors";
import pasteRoutes from "./routes/pasteRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/pastes", pasteRoutes);

app.get("/", (req, res) => {
  res.send("Pastebin Lite API running");
});

export default app;
