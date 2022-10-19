import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';
import Like from '../../components/Like';
import { useAuth } from '../auth/AuthProvider';
import { useLikeComment } from './api/useLikeComment';
import DeletePost from './DeleteComment';
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

interface CommentProps extends IComment {
  postAuthorId: string;
}

const Comment = ({
  _id,
  author,
  content,
  likes,
  postId,
  createdAt,
  postAuthorId,
}: CommentProps) => {
  const { user } = useAuth();

  const deleteBtn =
    user && (author._id === user._id || postAuthorId === user._id) ? (
      <DeletePost
        authorId={author._id}
        commentId={_id}
        postId={postId}
        triggerButton={
          <IconButton
            icon={<FaTrash />}
            aria-label='delete post'
            colorScheme='red'
            size='xs'
            variant='outline'
            zIndex={2}
          />
        }
      />
    ) : null;

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
          {format(new Date(createdAt), "'at' H:mm 'on' d MMM yyyy")}
        </Box>
        {deleteBtn}
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
