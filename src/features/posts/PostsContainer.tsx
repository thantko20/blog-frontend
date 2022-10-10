import {
  Box,
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Skeleton,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { usePosts } from './api/usePosts';
import PostCard from './PostCard';

const useFilteredPosts = () => {
  const { setFieldNameFilters, ...rest } = usePosts();
  const [text, setText] = useState('Latest');

  const sortByLatest = () => {
    setFieldNameFilters('createdAt');
    setText('Latest');
  };
  const sortByTop = () => {
    setFieldNameFilters('likes');
    setText('Top');
  };

  return { ...rest, sortByLatest, sortByTop, text };
};

const PostsContainer = () => {
  const {
    data: posts,
    isFetching,
    sortByLatest,
    sortByTop,
    text,
  } = useFilteredPosts();

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
          {text}
        </MenuButton>
        <MenuList>
          <MenuOptionGroup defaultValue={text} title="Sort By" type="radio">
            <MenuItemOption onClick={() => sortByLatest()} value="Latest">
              Latest
            </MenuItemOption>
            <MenuItemOption onClick={() => sortByTop()} value="Top">
              Top
            </MenuItemOption>
          </MenuOptionGroup>
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
