//export type Category = {
//    name: String,
//    id: Number
//}

// Define the nested object first
export interface UserData {
  id: number;
  username: string;
  password: string;
  isAuthor: boolean;
}

export interface CategoryData {
  id: number;
  category: string;
}

export interface PostData {
  id: number;
  title: string;
  text: string;
}

export interface CommentData {
  id: number;
  text: string;
  username: string;
}

// Define the main API response wrapper
export interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
}