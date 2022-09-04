import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../Hooks/currentUser';
import { useIsAuthorize } from '../Hooks/isAuthorize';
import { IPost } from '../models';
import DefaultUser from '../images/DefaultUser.png';
import DefaultPostImage from '../images/DefaultPostImage.png';
import Link from '@mui/material/Link';

interface PostDetailsProps {
  post: IPost | undefined;
}

function PostDetails({ post }: PostDetailsProps) {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  const [userRating, setUserRating] = useState<number | null>(0);
  const postImage = `https://localhost:7266/api/Blob?name=${post?.postImage.imageId}.${post?.postImage.format}`;
  const userImage = `https://localhost:7266/api/Blob?name=${post?.user.profileImage.imageId}.${post?.user.profileImage.format}`;

  const navigateToLogin = () => {
    navigate('/login');
  };

  console.log(currentUser);

  return (
    <Container component="main" sx={{ marginTop: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            color: '#4F3328',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '24px',
            textAlign: 'center',
          }}
        >
          {post?.title}
        </Typography>
        <Grid
          container
          sx={{
            margin: '15px 0px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Grid
            item
            sx={{
              width: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0px 10px',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: '150px',
                width: 'auto',
                borderRadius: '10px',
              }}
              image={postImage}
              onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (event.currentTarget.src = DefaultPostImage)
              }
            />
          </Grid>
          <Grid item sx={{ width: '55%' }}>
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '16px',
              }}
            >
              {post?.description}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              width: '20%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                overflow: 'hidden',
              }}
              image={userImage}
              onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
                (event.currentTarget.src = DefaultUser)
              }
            />
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '20px',
                color: '#4F3328',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              {`${post?.user.name} ${post?.user.surname}`}
            </Typography>
            <Rating
              name="simple-controlled"
              value={userRating}
              onChange={(event, newValue) => {
                setUserRating(newValue);
              }}
              sx={{
                color: '#116660',
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'left',
            width: '80%',
          }}
        >
          {post?.tags.map((tag) => (
            <Grid item key={tag.tagId}>
              <Typography
                sx={{
                  backgroundColor: 'rgba(243, 189, 149, 0.36);',
                  padding: '3px 10px',
                  margin: '0px 10px',
                  borderRadius: '20px',
                  boxShadow: '0px 3px 6px black',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '17px',
                  marginBottom: '15px',
                }}
              >
                {tag.name}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* send your post if authorize */}
        {isAuthorize ? (
          <>
            {/* if it`s another user post propose to send
          else propose to edit post*/}
            {currentUser?.userId !== post?.userId ? (
              <LinkRouter
                to="/send-post"
                state={{ receiverPost: post }}
                className="send-post-link"
              >
                Respond
              </LinkRouter>
            ) : (
              <h1>Edit Post</h1>
            )}
          </>
        ) : (
          <>
            {/* else proprose to register*/}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '10px 0px',
              }}
            >
              <Button
                sx={{
                  backgroundColor: 'rgba(89, 143, 135, 0.9)',
                  color: '#FFFCFC',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '15px',
                  width: '30%',
                  marginBottom: '10px',
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: '#044945',
                  },
                }}
                onClick={navigateToLogin}
              >
                Sign In
              </Button>

              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}

export default PostDetails;
