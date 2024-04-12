import bcrypt from 'bcrypt';
import { config } from "./config";

const saltRounds = 10;
const fetch = require('node-fetch');

export async function hashPassword(password: string): Promise<string> {
  // return bcrypt.hashSync(password, 10);  
  return await bcrypt.hash(password, saltRounds);
}

export async function ideaGeneration(skill: string, langs: string[], interests: string[], maxtokens: number): Promise<string> {
  // randomly selects project topic and lang from selections in profile
  let lang: string = langs[Math.floor(Math.random() * langs.length)];
  let interest: string = interests[Math.floor(Math.random() * interests.length)];
  let prompt = "Generate an " + skill + " level project idea for " + interest + " written in " + lang;

  if (skill === '' || maxtokens === 0) {
    return '';
  }
  else{
    // api call
    const response = await fetch('https://api.deepinfra.com/v1/openai/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          messages: [{role: "user", content: prompt}],
          max_tokens: maxtokens,
      }),
      headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${config.API_KEY}`,
      }
  });

  // returns result as promise, have to process w/ then
  const data = await response.json();
  return await data.choices[0].message.content;
  }
}