import { cssRule, style } from 'typestyle';
import { PORT, MessageRequest } from '../shared';
import { SendMessage, GetStorage } from './api';

// Add a css rule to the body w/ js (using typestyle)
cssRule('body', {
  backgroundColor: 'lime',
  margin: 0,
});

// Make a typed div element that takes up the whole of the page and centers in the middle
const div: HTMLDivElement = document.createElement('div');

// The text of this div is the port that the server is running on - this is a shared value between client/server and webpack injects it
// into our bundles for us
div.innerText = `Port: ${PORT}`;

// Make a new style w/ typestyle. The return value is a unique classname that is then appended to our div (this means the style is not
// inline for the element and can be shared with multiple elements)
div.className = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 48,
});

document.body.appendChild(div);

// Make a button the calls our api
const button: HTMLButtonElement = document.createElement('button');
button.innerText = 'Click Me!';
button.style.setProperty('margin', '10px');
button.onclick = () => {
  // Craft our api request
  const message: MessageRequest = {
    hash: '12345',
    key: 'keyz',
    value: 42,
  };

  // Send our message, wait for the promise to fulfill and then use the data. Note that typescript can infer the response type since our
  // api layer has set it's type
  SendMessage(message).then((res) => {
    console.log(res);
    button.innerText = res.randomNumber.toString();
  });
};

// Add our button as a child of the div element
div.appendChild(button);

// On page load, get info on how much storage is free on disk. Once we get a response, append that info to the page
GetStorage()
  .then((res) => {
    const storage: HTMLDivElement = document.createElement('div');
    storage.innerText = `Free space on / : ${res.storage} KB`;
    div.appendChild(storage);
  })
  .catch((err) => {
    // If something went wrong and we didn't get a status code of 200, here is where we would handle it in the client
    console.error(err);
  });
