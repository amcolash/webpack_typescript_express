// Port that the server runs on
export const PORT: number = 3000;

// Have shared string for the route to send a message
export const MessageRoute: string = '/message';

// Data that will be sent with any request to the '/message' route
export interface MessageRequest {
  hash: string;
  key: string;
  value: number;
}

// Data that is returned from the server after posting to the message route
export interface MessageResponse {
  randomNumber: number;
}

// Shared string for storage route
export const StorageRoute: string = '/storage';

export interface StorageResponse {
  storage: string;
}
