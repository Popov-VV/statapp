import path from "path";
import bodyParser from "body-parser";
import express, { Express, Response, Request } from "express";

import { EventModel } from "../models/Event";
import { collections } from "./mongoDbClient";

const server: Express = express();

server.engine("js", require("ejs").renderFile);
server.use(bodyParser.text());

server.get("/", function (req: Request, res: Response) {
  res.render(path.resolve("dist/client/tracker.js"));
});

server.post("/track", async function (req: Request, res: Response) {
  const events = JSON.parse(req.body);
  res.header({ "Access-Control-Allow-Origin": "*" });

  try {
    events.every(EventModel.createInstance);
    res.send("success");

    if (collections.tracks) {
      collections.tracks.insertMany(events);
    } else {
      // log error
    }
  } catch (err) {
    let body;
    if (err instanceof Error) body = err.message;
    res.status(500).send(body || "Error save event");
  }
});

export { server };
