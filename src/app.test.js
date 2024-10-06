const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("./app.js");

describe("GET /", () => {
  it("should return Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.text).to.equal("Hello World");
    expect(res.statusCode).to.equal(200);
  });
});
