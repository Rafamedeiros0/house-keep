let db: string[] = [
  "Wipe kitchen countertops",
  "Clean bathroom sink",
  "Dust shelves",
  "Sweep the kitchen floor",
  "Wipe down the dining table",
  "Clean the microwave (inside and outside)",
  "Take out the trash",
  "Wipe bathroom mirror",
  "Vacuum a single room",
  "Clean the stovetop",
  "Organize the shoe area",
  "Wipe TV stand and electronics",
];

const addItem = (item: string) => {
  db.push(item);
  return db;
};

const removeItem = (item: string) => {
  const index = db.indexOf(item);

  if (index !== -1) {
    db.splice(index, 1);
  }

  return db;
};

const removeAll = (item: string) => {
  db = db.filter((i) => i !== item);

  return db;
};

const listItems = () => {
  return [...db];
};

const getItem = (index: number) => {
  return db[index] ?? null;
};

const clearDatabase = () => {
  db = [];
  return db;
};

const getLenth = () => {
  return db.length;
};

export {
  addItem,
  clearDatabase,
  getItem,
  getLenth,
  listItems,
  removeAll,
  removeItem,
};
