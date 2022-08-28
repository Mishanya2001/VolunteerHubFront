import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { IPost } from '../models';

//gets post from server
export function usePosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //add new post to collection
  function addPost(post: IPost) {
    setPosts((prev) => [...prev, post]);
  }

  async function getPosts() {
    try {
      setError('');
      setLoading(true);

      const response = await axios.get<IPost[]>(
        'https://localhost:7266/api/Post',
        {
          withCredentials: true,
        }
      );

      setPosts(response.data);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return { posts, error, loading, setPosts, addPost };
}
