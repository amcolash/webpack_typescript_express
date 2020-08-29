import axios from 'axios';
import { PORT, MessageRequest, MessageResponse, MessageRoute, StorageResponse, StorageRoute } from '../shared';

// TODO: Get this to point to an IP address, use an .env file or even just hardcoded. Maybe have it set up as an injected value w/ webpack
const api = axios.create({ baseURL: `http://localhost:${PORT}` });

// POST to the message route with our data (which has type safety). Once a response is recieved, resolve the promise and return the resolved
// data casted to the correct MessageResponse
export async function SendMessage(message: MessageRequest): Promise<MessageResponse> {
  return (await api.post(MessageRoute, message)).data as MessageResponse;
}

// GET data from the storage route to see how much disk space is free
export async function GetStorage(): Promise<StorageResponse> {
  return (await api.get(StorageRoute)).data as StorageResponse;
}
