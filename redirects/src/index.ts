import express, { Request, Response } from "express";
import rootRedirectionNodes from "#source/redirectRoot";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RedirectNodeHub, RedirectNodeLeaf } from "#source/redirectNode";
import htmlPage from "#source/html-document";

const app = express();

app.use(express.static("public"));

/* Handling URLs */ {
  app.get(/.+/, (request: Request, responds: Response) => {

    console.log(`Request from ${request.ip} for ${request.path} at ${(new Date).toISOString()}.`);
    
    try { 
      
      const path = request.path.split("/");

      let pieces: string[] = [];
      /** Parsing the path */ {
        for (let index = 0; index < path.length; index += 1) {
          switch(path[index]) {
            case "":  continue;
            case ".": continue;
            case "..":
              pieces.pop();
              continue;
            default: pieces.push(path[index]);
          }
        }
      }

      const node = rootRedirectionNodes.recurse(pieces);

      /* Dealing with undefined paths */ {
        if (node === undefined) {
          responds.status(StatusCodes.NOT_FOUND).send(`${StatusCodes.NOT_FOUND}: ${ReasonPhrases.NOT_FOUND}`);
          return;
        }
      }

      /* Enforcing password protection on hidden paths if enabled */ {
        const passwordRequired = process.env.REDIRECT_HIDDEN_PASSWORD;
        const wrongPassword = passwordRequired !== request.query?.password;
        if (node.hidden && passwordRequired && wrongPassword) {
          responds.status(StatusCodes.NOT_FOUND)
          .send(`${StatusCodes.NOT_FOUND}: ${ReasonPhrases.NOT_FOUND}`);
          return;
        } 
      }

      /* redirecting if ending up at a leaf node. */ {
        if (node instanceof RedirectNodeLeaf) {
          responds.status(StatusCodes.SEE_OTHER).redirect(node.url.toString());
          return;
        }
      }

      /* Sending an HTML document if a selection can still be made */ {
        if (node instanceof RedirectNodeHub) {
          const title = ( path[path.length-1] === "" 
            ? "Redirection Station" 
            : `Redirection Station - ${path[path.length-1]}`);
          responds.status(StatusCodes.OK).send(htmlPage(title, node));  
          return;
        }
      }
      
      // Since we can't enforce case extensive matching. Should never happen.
      throw new Error("Unhandled case in: \"app.get()\"");

    } catch (occurred_error) {
      console.error(occurred_error);
      responds.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
        `${StatusCodes.INTERNAL_SERVER_ERROR}: ${ReasonPhrases.INTERNAL_SERVER_ERROR}`
      );
    }
  });  
}

/* Starting the app */ {
  const port = process.env.PORT || 80;
  app.listen(port, () => {
    const mode = process.env.NODE_ENV || "an unknown";
    const external_url = process.env.TVDH_REDIRECT_SERVER_URL_EXTERNAL || "an unknown url.";
    console.log(`Running on port ${port} in ${mode} mode. Available at ${external_url}`);
  });  
}
