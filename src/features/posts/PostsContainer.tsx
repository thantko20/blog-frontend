import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { usePosts } from './api/usePosts';
import PostCard from './PostCard';

const PostsContainer = () => {
  const {
    data: posts,
    isFetching,
    setFieldNameFilters,
    setSortOrderFilters,
  } = usePosts();

  return (
    <Box>
      <Heading as="h2">Posts</Heading>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<BiChevronDown />}
          variant="outline"
          colorScheme="blue"
          size="sm"
          mt={4}
        >
          Sort By
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setFieldNameFilters('createdAt')}>
            Latest Posts
          </MenuItem>
          <MenuItem onClick={() => setFieldNameFilters('likes')}>
            Top Posts
          </MenuItem>
        </MenuList>
      </Menu>
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
