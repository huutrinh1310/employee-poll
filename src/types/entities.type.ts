export interface User {
  id: string;
  password?: string;
  name: string;
  avatarURL: string;
  answers: object;
  questions: string[];
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: Option;
  optionTwo: Option;
}

export interface Option {
  votes: string[];
  text: string;
}

export interface UserLogin {
  username?: string;
}
