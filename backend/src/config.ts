import dotenv from "dotenv";

dotenv.config({path: '../.env'});

// gets API key from .env in root folder
const { API_KEY } = process.env;

if (!API_KEY) {
  throw new Error("Missing deepinfra API key!");
}

export const config = {
  API_KEY,
};

// The API key HAS to be in the backend folder (in .env fole) for the code to run
// .env format: API_KEY = "<enter API key here>"