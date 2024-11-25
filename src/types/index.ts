export interface Reply {
    id: number;
    content: string;
    author: string;
    date: string; // ISO date string
  }
  
  export interface Diary {
    id: number;
    title: string;
    author: string;
    date: string; // ISO date string
    patient: string;
    tags: string[];
    annotation: string;
    replies: Reply[];
  }