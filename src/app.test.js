import request from "supertest";
import { expect } from "chai";
import app from "./app.js"; 
import dotenv from 'dotenv';

dotenv.config();

let server;

before((done) => {
  server = app.listen(3001, () => {
    console.log("Test server is running on port 3001");
    done();
  });
});

after((done) => {
  server.close(() => {
    console.log("Test server closed");
    done();
  });
});

describe("GET /", () => {
  it("should return Hello World", async () => {
    const res = await request(server).get("/");
    expect(res.text).to.equal("Hello World");
    expect(res.statusCode).to.equal(200);
  });
});
