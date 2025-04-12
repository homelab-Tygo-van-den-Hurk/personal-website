import express, { Request, Response } from 'express';
import { getPinnedRepositories } from "./github-interactions";

if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const app = express();

app.use(express.static("public"));

app.get("/api/v1/github/pinned-repositories", async (request: Request, responds: Response) => {
  try { 
    const pinnedRepositories = await getPinnedRepositories()
    responds.json(pinnedRepositories); 
  } 

  catch (err) {
    console.error(err);
    responds.status(500).json({ error: 'an unknown error occurred' });
  }
});


const port = process.env.PORT || 80;
app.listen(port, () => {
  const mode = process.env.NODE_ENV || "an unknown";
  const external_url = process.env.TVDH_BACKEND_SERVER_URL_EXTERNAL || "an unknown url.";
  console.log(`Running on port ${port} in ${mode} mode. Available at ${external_url}`);
});
