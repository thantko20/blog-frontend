import {
  Box,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Like from '../../components/Like';
import { useAuth } from '../auth/AuthProvider';
import CommentsContainer from '../comments/CommentsContainer';
import { useLikePost } from './api/useLikePost';
import { usePost } from './api/usePost';
import DeletePost from './DeletePost';

interface PostLikeProps {
  likes: string[];
  postId: string;
}

const PostLike = ({ likes, postId }: PostLikeProps) => {
  const { user } = useAuth();
  const hasLiked = likes.includes(user?._id as string);
  const mutation = useLikePost();
  const toast = useToast({
    position: 'top',
    duration: 8000,
    isClosable: true,
  });

  const onClickLike = () => {
    mutation.mutate(postId, {
      onError: (error) => {
        if (error instanceof Error) {
          toast({
            title: error.message,
            status: 'error',
          });
        }
      },
    });
  };

  return (
    <Like
      hasLiked={hasLiked}
      likes={likes}
      likesCount={likes.length}
      onClickLike={onClickLike}
    />
  );
};

const Post = () => {
  const { user } = useAuth();
  const { postId } = useParams();
  const { data: post, isFetching, refetch } = usePost(postId as string);
  const navigate = useNavigate();

  return (
    <Box>
      {!post && isFetching && (
        <VStack>
          <Skeleton w='full' height='100px' />
          <Skeleton w='full' height='400px' />
        </VStack>
      )}
      {post && !isFetching && (
        <>
          <Box>
            <Box>
              <Box>
                <Heading as='h1'>{post?.title}</Heading>
                <HStack mt={2}>
                  <Box
                    as='span'
                    fontSize='lg'
                    fontWeight='semibold'
                    color='blue.400'
                  >
                    {post.author ? post.author.fullname : 'Unknown'}
                  </Box>
                  <span>&bull;</span>
                  <Box as='time' fontSize='sm'>
                    {format(new Date(post.createdAt), 'dd MMM yyyy')}
                  </Box>
                  {user?._id === post.author?._id ? (
                    <DeletePost
                      authorId={post.author?._id as string}
                      postId={post._id}
                      triggerButton={
                        <IconButton
                          icon={<FaTrash />}
                          aria-label='delete post'
                          colorScheme='red'
                          size='sm'
                          variant='outline'
                        />
                      }
                      onSuccess={() => navigate('/')}
                    />
                  ) : null}
                </HStack>
              </Box>
              <Box
                dangerouslySetInnerHTML={{ __html: post?.content as string }}
                className='prose'
                mt={10}
              ></Box>
              <Box mt={10}>
                <PostLike likes={post.likes} postId={post._id} />
              </Box>
            </Box>
            <Box mt={8}>
              <CommentsContainer
                postId={post._id}
                postAuthorId={post.author?._id as string}
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Post;
