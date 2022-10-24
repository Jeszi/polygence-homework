import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getSpendings, saveSpending } from "./controllers/spendings";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/spendings", getSpendings);
app.post("/spendings", saveSpending);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
