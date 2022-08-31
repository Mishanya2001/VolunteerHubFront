import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../Hooks/currentUser';
import { useIsAuthorize } from '../Hooks/isAuthorize';
import { IPost } from '../models';
import ErrorMessage from './ErrorMessage';

interface PostDetailsProps {
  post: IPost;
}

function PostDetails({ post }: PostDetailsProps) {
  const navigate = useNavigate();
  const { isAuthorize } = useIsAuthorize();
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState<number | null>(0);
  const postImage = `https://localhost:7266/api/Blob?name=${post.postImage.imageId}.${post.postImage.format}`;
  const userImage = `https://localhost:7266/api/Blob?name=${post.user.profileImage.imageId}.${post.user.profileImage.format}`;
  
  //for pop up menu========================
  const { currentUser } = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isPostsMenuOpen = Boolean(anchorEl);
  //element needs anchor
  const handlePostsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  //set ahchor to null, no element needs menu
  const handlePostsMenuClose = () => {
    setAnchorEl(null);
  };
  const navigateToCreatePost = () => {
    navigate('/create-post');
  };
  //set anchor element
  const handleSendPost = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  //menu, that will pop up if account icon clicked
  const menuId = 'send-post-menu';
  const renderPostsMenu = (
    <Menu
      //to what element to attach
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isPostsMenuOpen}
      onClose={handlePostsMenuClose}
    >
      {currentUser?.posts.map((post) => (
        <MenuItem onClick={handleSendPost}>{post.title}</MenuItem>
      ))}
      <MenuItem onClick={navigateToCreatePost}>Create post</MenuItem>
    </Menu>
  );

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Container component="main" sx={{ marginTop: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography sx={{
          color: '#4F3328',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '24px',
          textAlign: 'center'
        }}>
          {post.title}
        </Typography>

        <Grid container sx={{
          margin: '15px 0px',
          display: 'flex',
          flexDirection: 'row'
        }}>
          <Grid item sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0px 10px'
          }}>
            <CardMedia
              component="img"
              sx={{
                height: '150px',
                width: 'auto',
                borderRadius: '10px'
              }}
              image={postImage}
              alt="post_image"
            />
          </Grid>
          <Grid item sx={{ width: '55%' }}>
            <Typography sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px'
            }}>
              {post.description}
            </Typography>
          </Grid>
          <Grid item sx={{
            width: '20%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <CardMedia
              component="img"
              sx={{
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                overflow: 'hidden'
              }}
              image={userImage}
              alt="UserImage"
            />
            <Typography sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '20px',
              color: '#4F3328',
              textAlign: 'center',
              marginTop: '10px'
            }}>
              {`${post.user.name} ${post.user.surname}`}
            </Typography>
            <Rating
              name="simple-controlled"
              value={userRating}
              onChange={(event, newValue) => {
                setUserRating(newValue);
              }}
              sx={{
                color: '#116660'
              }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'left',
            width: '80%'
          }}>
          {post.tags.map((tag) => (
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
                  marginBottom: '15px'
                }}>
                {tag.name}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* send your post if authorize */}
        {isAuthorize ? <Button
          onClick={handleSendPost}
          aria-haspopup="true"
          aria-controls={menuId}
          sx={{
            backgroundColor: 'rgba(89, 143, 135, 0.9)',
            color: '#FFFCFC',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '15px',
            margin: '10px auto',
            width: '30%',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#044945',
            }
          }}>
          Respond
        </Button>
          :
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px 0px'
          }}>
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
                }
              }}
              onClick={navigateToLogin}
            >
              Sign In
            </Button>

            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
            {error && <ErrorMessage error={error} />}
          </Box>}
      </Box>
      {renderPostsMenu}
    </Container>
  );
}

export default PostDetails;
