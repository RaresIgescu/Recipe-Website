import { init, i, id, InstaQLEntity } from "@instantdb/core";

// ID for app: Lenovo
const APP_ID = "0a62fbb4-351c-4656-9b28-14b40346d823";

// Optional: Declare your schema!
const schema = i.schema({
  entities: {
    recipes: i.entity({
      id: i.string(),
      name: i.string(),
      image: i.string(),
      difficulty: i.string(),
      prepTimeMinutes: i.number(),
    }),
  },
});

const db = init({ appId: APP_ID, schema });

export {db, schema};