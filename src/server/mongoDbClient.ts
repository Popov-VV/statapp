import * as dotenv from "dotenv";
import { MongoClient, Collection } from "mongodb";

const config = dotenv.config().parsed || {};

if (!config.MONGO_CONNECT) {
  throw new Error("MONGO_CONNECT in .ENV is required");
}
console.log("MONGO_CONNECT", config.MONGO_CONNECT);

const client = new MongoClient(config.MONGO_CONNECT);
const dbName = "fundraiseup";

async function main() {
  await client.connect();
  console.log("Connected successfully to database");

  const db = client.db(dbName);
  const tracks = db.collection("tracks");

  return {
    tracks,
  };
}

let collections: {
  tracks: Collection;
};

main().then((result) => {
  collections = result;
});

export { collections };
export let ClientClose = () => {
  client.close();
};
