import { createContext } from "react";

export const UserContext = createContext({
  userId: null,
  setUserId: () => {},
  skillLevel: null,
  setSkillLevel: () => {},
  languages: [],
  setLanguages: () => {},
  interests: [],
  setInterests: () => {},
  username: null,
  setUsername: () => {},
});
