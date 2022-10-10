import { Box, Heading, Skeleton, VStack } from '@chakra-ui/react';
import { usePosts } from './api/usePosts';
import PostCard from './PostCard';

const PostsContainer = () => {
  const { data: posts, isFetching } = usePosts();

  return (
    <Box>
      <Heading as="h2">Posts</Heading>
      <VStack mt={4} spacing="1.5rem">
        {!posts && isFetching && (
          <>
            <Skeleton height="100px" w="full" />
            <Skeleton height="100px" w="full" />
            <Skeleton height="100px" w="full" />
          </>
        )}
        {posts &&
          !isFetching &&
          posts?.map((post) => <PostCard key={post._id} {...post} />)}
      </VStack>
    </Box>
  );
};

export default PostsContainer;
