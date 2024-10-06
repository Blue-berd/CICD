import request from "supertest";
import { expect } from "chai";
import app from "./app.js"; 
import dotenv from 'dotenv';

dotenv.config();

let server;

describe("GET /", () => {
  it("should return Hello World", async () => {
    const res = await request(server).get("/");
    expect(res.text).to.equal("Hello World");
    expect(res.statusCode).to.equal(200);
  });
});
