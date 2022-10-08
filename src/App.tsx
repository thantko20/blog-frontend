import { useEffect, useState } from 'react';

interface Post {
  title: string;
  author: string;
  likes: string[];
  body: string[];
  _id: string;
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();

      setPosts(data.data as Post[]);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return <div key={post._id}>{post.title}</div>;
      })}
    </div>
  );
};

export default App;
