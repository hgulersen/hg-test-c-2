interface Question {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: {
    id: string;
    answer: string;
  }[];
  user: {
    name: string;
    avatar: string;
  };
}

interface Answer {
  id: number;
  correct_options: {
    id: string;
    answer: string;
  }[];
}

interface ForYouApiResponse {
  data?: Question;
  error?: string;
}

interface AnswerApiResponse {
  data?: Answer;
  error?: string;
}

interface ImageUriInfo {
  type: "local" | "remote";
  uri: string;
}
