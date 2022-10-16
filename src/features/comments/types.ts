export interface IComment {
  content: string;
  author: {
    firstName: string;
    lastName: string;
    fullname: string;
    _id: string;
  };
  likes: string[];
  postId: string;
  _id: string;
}
