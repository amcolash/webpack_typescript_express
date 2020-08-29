import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { exec } from 'child_process';
import { join } from 'path';
import { PORT, MessageResponse, MessageRequest, MessageRoute, StorageRoute, StorageResponse } from '../shared';

// Make our server
const app = express();

// Automagically parse the body (intrepreted as json) and make it into an object
app.use(bodyParser.json());

// Set up CORS using defaults to make life easy
app.use(cors());

// The path here is dist/static (as this server script is actually run from the dist/ folder - never from src)
app.use(express.static(join(__dirname, 'static')));

// Handle when a client POSTs to the message route '/message'
app.post(MessageRoute, (req, res) => {
  // Cast the request as our strictly typed request - note this does not mean that the data is valid (so we might still need to check)
  // It does however limit the scope of what we assume we can do with the data and makes server/client calls safer
  const request: MessageRequest = req.body as MessageRequest;
  console.log(`hash: ${request.hash}, key: ${request.key}, value: ${request.value}`);

  // Craft a response using the repsonse type
  const response: MessageResponse = {
    randomNumber: Math.random(),
  };

  // Send the response back to the client app
  res.send(response);
});

// Get the current space available on disk in KB (assuming we are running in a bash environment here - who uses CMD anyways?)
app.get(StorageRoute, (req, res) => {
  exec(`df -Pk . | sed 1d | grep -v used | awk '{ print $4 "\t" }'`, function (err, output) {
    if (err) {
      console.error(err);
      res.status(500);
    } else {
      console.log(output);
      const response: StorageResponse = { storage: output.trim() };
      res.send(response);
    }
  });
});

// Listen on our PORT (3000) This needs to stay at the bottom of the file so that all routes are set before we start listening
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
