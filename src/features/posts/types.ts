export interface IPost {
  title: string;
  author: TPostAuthor;
  likes: string[];
  body: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export type TPostAuthor =
  | {
      firstName: string;
      lastName: string;
      _id: string;
    }
  | null
  | undefined;
