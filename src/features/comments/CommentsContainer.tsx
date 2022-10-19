import {
  Box,
  Heading,
  Skeleton,
  VStack,
  Text,
  HStack,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAddComment } from './api/useAddComment';
import { useComments } from './api/useComments';
import Comment from './Comment';

const AddComment = ({
  postId,
  refetch,
}: {
  postId: string;
  refetch: () => void;
}) => {
  const mutation = useAddComment();
  const toast = useToast();

  const [content, setContent] = useState('');

  const onSubmit = async () => {
    if (!Boolean(content)) return;

    mutation.mutate({ content, postId });
    setContent('');
  };

  return (
    <HStack>
      <Input
        size='sm'
        placeholder='What are your thoughts?'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        variant='outline'
        colorScheme='blue'
        size='sm'
        disabled={!Boolean(content)}
        onClick={onSubmit}
        isLoading={mutation.isLoading}
      >
        Post
      </Button>
    </HStack>
  );
};

interface CommentsContainerProps {
  postId: string;
  postAuthorId: string;
}

const CommentsContainer = ({
  postId,
  postAuthorId,
}: CommentsContainerProps) => {
  const { data: comments, isFetching, refetch } = useComments(postId);

  return (
    <VStack align='stretch' spacing={6}>
      <Heading as='h2' fontSize='2xl'>
        Comments
      </Heading>
      <AddComment postId={postId} refetch={refetch} />
      <VStack spacing={4} mt={4} alignItems='stretch'>
        {comments &&
          !isFetching &&
          comments.map((comment) => (
            <Comment
              {...comment}
              postAuthorId={postAuthorId}
              key={comment._id}
            />
          ))}

        {isFetching && !comments && (
          <>
            <Skeleton w='full' h={35} rounded='md' />
            <Skeleton w='full' h={35} rounded='md' />
            <Skeleton w='full' h={35} rounded='md' />
          </>
        )}
        {comments?.length === 0 && <Text textAlign='center'>No Comments.</Text>}
      </VStack>
    </VStack>
  );
};

export default CommentsContainer;
