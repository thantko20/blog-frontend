import { Box, Heading, Skeleton, VStack } from '@chakra-ui/react';
import { useComments } from './api/useComments';
import TextEditor from '../../components/TextEditor';
import Comment from './Comment';

const CommentsContainer = ({ postId }: { postId: string }) => {
  const { data: comments, isFetching } = useComments(postId);

  return (
    <Box>
      <Heading as='h2' fontSize='2xl'>
        Comments
      </Heading>
      <VStack spacing={4} mt={4} alignItems='stretch'>
        {comments &&
          !isFetching &&
          comments.map((comment) => <Comment {...comment} />)}

        {isFetching && !comments && (
          <>
            <Skeleton w='full' h={35} rounded='md' />
            <Skeleton w='full' h={35} rounded='md' />
            <Skeleton w='full' h={35} rounded='md' />
          </>
        )}
      </VStack>
    </Box>
  );
};

export default CommentsContainer;
