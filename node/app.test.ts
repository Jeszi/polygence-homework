import request from "supertest";
import app from "./app";

describe("/spendings", () => {
  it("should response the GET method", (done) => {
    request(app)
      .get("/spendings")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
