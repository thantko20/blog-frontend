import { Box, Heading, Skeleton, VStack } from '@chakra-ui/react';
import { useComments } from './api/useComments';

const CommentsContainer = ({ postId }: { postId: string }) => {
  const { data: comments, isFetching } = useComments(postId);

  return (
    <Box>
      <Heading as="h2" fontSize="2xl">
        Comments
      </Heading>
      <VStack spacing={2} mt={4}>
        {comments &&
          !isFetching &&
          comments.map((comment) => <p>{comment.content}</p>)}

        {isFetching && !comments && (
          <>
            <Skeleton w="full" h={35} rounded="md" />
            <Skeleton w="full" h={35} rounded="md" />
            <Skeleton w="full" h={35} rounded="md" />
          </>
        )}
      </VStack>
    </Box>
  );
};

export default CommentsContainer;
