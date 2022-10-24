import { Request, Response } from "express";
import { db } from "../db/db";
import type { SpendingDB } from "../types/spendings";

const getSpendings = async (req: Request, res: Response) => {
  try {
    const spendings: SpendingDB[] = db.findAll();

    return res.send(spendings);
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};

const saveSpending = async (req: Request, res: Response) => {
  try {
    const spending = req.body;

    const newSpending: SpendingDB = db.insert(spending);

    return res.send(newSpending);
  } catch ({ message }) {
    return res.status(500).json({ error: message });
  }
};

export { getSpendings, saveSpending };
