import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { usePosts } from '../Hooks/posts';
import Copyright from './Copyright';
import ErrorMessage from './ErrorMessage';
import Modal from './Modal';
import Post from './Post';
import PostDetails from './PostDetails';
import SiteLoader from './SiteLoader';

import { IPost } from '../models';

export default function PoststList() {
  const { posts, error, loading, addPost } = usePosts();
  //for modal
  const [currentPost, setCurrentPost] = useState<IPost | undefined>();

  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading && <SiteLoader />}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 1,
            pb: 3,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Recent Posts
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Select the post you want to contribute to
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={12} md={12}>
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
      </main>
      {/* Footer */}
      <Box sx={{ pb: 6 }} component="footer">
        <Copyright />
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          For more information look FAQ
        </Typography>
      </Box>
    </>
  );
}