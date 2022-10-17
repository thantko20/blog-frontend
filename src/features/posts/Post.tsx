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
import { FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Like from '../../components/Like';
import { useAuth } from '../auth/AuthProvider';
import CommentsContainer from '../comments/CommentsContainer';
import { useLikePost } from './api/useLikePost';
import { usePost } from './api/usePost';

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
  const { postId } = useParams();
  const { data: post, isFetching, refetch } = usePost(postId as string);

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
                <HStack>
                  <Box as='span' fontSize='2xl' fontWeight='semibold'>
                    {post.author ? post.author.fullname : 'Unknown'}
                  </Box>
                  <span>&bull;</span>
                  <Box as='time' fontSize='sm'>
                    {format(new Date(post.createdAt), 'dd MMM yyyy')}
                  </Box>
                </HStack>
                <Heading as='h1' mt={4}>
                  {post?.title}
                </Heading>
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
              <CommentsContainer postId={post._id} />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Post;
