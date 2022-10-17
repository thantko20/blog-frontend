import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import Like from '../../components/Like';
import { useAuth } from '../auth/AuthProvider';
import { useLikeComment } from './api/useLikeComment';
import { IComment } from './types';

interface CommentLikeProps {
  commentId: string;
  postId: string;
  likes: string[];
}

const CommentLike = ({ commentId, postId, likes }: CommentLikeProps) => {
  const mutation = useLikeComment();
  const { user } = useAuth();
  const hasLiked = likes.includes(user?._id as string);

  const onClickLike = () => {
    mutation.mutate({ commentId, postId });
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

const Comment = ({
  _id,
  author,
  content,
  likes,
  postId,
  createdAt,
}: IComment) => {
  return (
    <VStack
      spacing={4}
      bgColor='white'
      rounded='sm'
      p={4}
      boxShadow='md'
      align='stretch'
    >
      <HStack>
        <Text fontWeight='semibold' fontSize='sm'>
          {author.fullname}
        </Text>
        <Box as='time' fontSize='sm' fontStyle='italic'>
          {format(new Date(createdAt), "'at' H:mm 'on' do MMM yyyy")}
        </Box>
      </HStack>
      <Box
        dangerouslySetInnerHTML={{ __html: content }}
        className='prose'
      ></Box>
      <CommentLike commentId={_id} postId={postId} likes={likes} />
    </VStack>
  );
};

export default Comment;
