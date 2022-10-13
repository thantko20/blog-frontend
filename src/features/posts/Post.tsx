import { Box, Heading, Skeleton, VStack } from '@chakra-ui/react';
import { Prose } from '@nikolovlazar/chakra-ui-prose';
import { useParams } from 'react-router-dom';
import { usePost } from './api/usePost';

const Post = () => {
  const { postId } = useParams();
  const { data: post, isFetching } = usePost(postId as string);

  return (
    <Box>
      {!post && isFetching && (
        <VStack>
          <Skeleton w="full" height="100px" />
          <Skeleton w="full" height="400px" />
        </VStack>
      )}
      {post && !isFetching && (
        <>
          <Heading as="h1">{post?.title}</Heading>
          <Box
            dangerouslySetInnerHTML={{ __html: post?.content as string }}
            className="prose"
            mt="2rem"
          ></Box>
        </>
      )}
    </Box>
  );
};

export default Post;
