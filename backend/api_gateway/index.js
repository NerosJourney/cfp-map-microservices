const express = require("express");
const app = express();
const http = require("http");
const PORT = process.env.GATEWAY_PORT || 8080;

app.use(express.json());

// Note: This adds additional coupling and should be reworked later
app.post("/update_ports", (req, res) => {
  http
    .get(`http://localhost:${API_MANAGER_PORT}/known_ports`, (resp) => {
      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        res.status(200).send(data);
      });
    })
    .on("error", (err) => {
      res.status(404).send(err);
    });
});

app.get("/test/db", async (req, res) => {
  const response = await fetch(`http://backend_conference_store_1:8083/test`);
  const jsonData = await response.json();
  res.status(200).send(jsonData);
});

app.get("/test", (req, res) => {
  res.status(200).send({ message: "hello!" });
});

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));
