import request from "supertest";
import { expect } from "chai";
import app from "./app.js"; 

describe("GET /", () => {
  it("should return Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.text).to.equal("Hello World");
    expect(res.statusCode).to.equal(200);
  });
});
