export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

export interface Reply {
    id: number;
    content: string;
    author: string;
    date: string; // ISO date string
  }

export interface Tag {
    id: number;
    group: string;
    name: string;
  }
  
export interface Diary {
    id: number;
    title: string;
    author: string;
    date: string; // ISO date string 'YYYY-MM-DD'
    patient: string;
    tags: Tag[];
    annotation: string;
    replies: Reply[];
  }