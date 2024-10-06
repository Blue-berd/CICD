import request from "supertest";
import { expect } from "chai";
import app from "./app.js"; 

describe("GET /", () => {
  let server;

  before((done) => {
    server = app.listen(3001, done);
  });

  after((done) => {
    server.close(done);
  });

  it("should return Hello World", async () => {
    const res = await request(server).get("/");
    expect(res.text).to.equal("Hello World!");
    expect(res.statusCode).to.equal(200);
  });
});
