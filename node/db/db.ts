import { v4 as uuid } from "uuid";

const dataBase = [];

function findById(id: string) {
  try {
    return dataBase.find((dbRecord) => dbRecord.id === id);
  } catch (e) {
    return e;
  }
}

function findAll() {
  try {
    return dataBase;
  } catch (e) {
    return e;
  }
}

function insert(item: any) {
  try {
    const newItem = {
      id: uuid(),
      ...item,
    };
    dataBase.push(newItem);

    return newItem;
  } catch (e) {
    return e;
  }
}

export const db = {
  findById,
  findAll,
  insert,
};
