import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";

import "./config/db.js";

const app = express();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use("/", express.static("./client/build"));

const port = 3050;
// app.listen(port, () => {});
app.listen(port, () => {
    console.log(`🚀 Server listening on http://localhost:${port}`);
}
);

export { app };
