import { Button, Container, Grid } from '@mui/material';
import axios, { AxiosError } from 'axios';
import ErrorMessage from './ErrorMessage';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { usePosts } from '../Hooks/posts';
import { IPost } from '../models';
import SiteLoader from './SiteLoader';
import Post from './Post';
import PostDetails from './PostDetails';
import Modal from './Modal';
import { useCurrentUser } from '../Hooks/currentUser';
import { useNavigate } from 'react-router-dom';

function AccounPosts() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const [userPosts, setUserPosts] = useState<IPost[]>([]);
  const { posts, error, loading, addPost } = usePosts();
  const [currentPost, setCurrentPost] = useState<IPost | undefined>();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = () => {
    console.log(currentUser?.posts);
    if (currentUser !== undefined) setUserPosts(currentUser.posts);
  };

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <SiteLoader />}

      <Button
        variant="contained"
        sx={{
          borderRadius: 28,
          position: 'fixed',
          bottom: '2%',
          right: '2%',
          zIndex: 2000,
        }}
        onClick={navigateToCreatePost}
      >
        New post
      </Button>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {userPosts.map((post) => (
            <Grid item key={post.id} xs={10} sm={10} md={10}>
              <Post
                post={post}
                key={post.id}
                setCurrentPost={(currentPost: IPost) =>
                  setCurrentPost(currentPost)
                }
              />
            </Grid>
          ))}
          {/* set modal for post view */}
          {currentPost !== undefined && (
            <Modal
              title="Post Details"
              onClose={() => setCurrentPost(undefined)}
            >
              <PostDetails post={currentPost} />
            </Modal>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default AccounPosts;
