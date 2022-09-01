import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as LinkRouter } from 'react-router-dom';
import { useIsAuthorize } from '../Hooks/isAuthorize';
import { useReceiverPost } from '../Hooks/receiverPost';
import { IPost } from '../models';
import ErrorMessage from './ErrorMessage';

interface PostDetailsProps {
  post: IPost | undefined;
}

function PostDetails({ post }: PostDetailsProps) {
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState<number | null>(0);
  const postImage = `https://localhost:7266/api/Blob?name=${post?.postImage.imageId}.${post?.postImage.format}`;
  const { setReceiverPost } = useReceiverPost();

  const navigateToSendPost = () => {
    setReceiverPost(post);
    navigate('/send-post');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography component="h2" variant="h4" align="center">
          {post?.title}
        </Typography>
        <Grid container sx={{ mt: 2 }}>
          <Grid item xs>
            <Typography variant="h5" color="text.secondary" paragraph>
              {post?.description}
            </Typography>
          </Grid>
          <Grid item sx={{ ml: 2 }}>
            <CardMedia
              component="img"
              sx={{
                pt: '10.25%',
                width: '200px',
                height: '200px',
              }}
              image={postImage}
              alt="post_image"
            />
            <Typography component="h2" variant="h4">
              {post?.user.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-center' }}>
              <Rating
                name="simple-controlled"
                value={userRating}
                onChange={(event, newValue) => {
                  setUserRating(newValue);
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: 'flex',
          }}
        >
          {post?.tags.map((tag) => (
            <Grid item key={tag.tagId}>
              <Typography
                sx={{
                  backgroundColor: '#FFEDE0',
                  padding: '3px 3px',
                  margin: '10px 5px',
                  borderRadius: '20px',
                  boxShadow: '0px 3px 6px black',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  width: '100px',
                }}
              >
                {tag.name}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* send your post if authorize */}
        {isAuthorize && (
          <LinkRouter to="/send-post" state={{ receiverPost: post }}>
            {'Send post'}
          </LinkRouter>
          //<Button onClick={navigateToSendPost}>Send your post</Button>
        )}

        {/* propose sign up or register if not aythorize */}
        {!isAuthorize && (
          <Box sx={{ mt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={navigateToLogin}
            >
              Sign In
            </Button>

            <Grid>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            {error && <ErrorMessage error={error} />}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default PostDetails;
