import express, { Request, Response } from 'express';

const port = process.env.PORT || 80;
const app = express();

app.get("/", (request: Request, responds: Response) => {
  responds.json({ message: "redirects operational" });
});

app.listen(port, () => console.log(`Running on port ${port}`));
