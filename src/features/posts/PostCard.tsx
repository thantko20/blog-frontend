import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { IPost } from './types';

const PostCard = ({ title, author, likes, _id, createdAt }: IPost) => {
  return (
    <LinkBox
      as="article"
      w="full"
      boxShadow="md"
      p="1rem"
      rounded="md"
      role="group"
      bgColor="whiteAlpha.900"
    >
      <Box as="time" dateTime={createdAt} fontSize="sm" color="gray.600">
        {formatDistanceToNow(new Date(createdAt))} ago
      </Box>
      <Heading as="h3" textOverflow="ellipsis" fontSize="2xl">
        <LinkOverlay
          as={RouterLink}
          to={`/posts/${_id}`}
          _groupHover={{
            textDecor: 'underline',
          }}
        >
          {title}
        </LinkOverlay>
      </Heading>
      <Text mt={1} fontSize="sm">
        by{' '}
        <Box as="span" fontWeight="semibold">
          {author?.firstName} {author?.lastName}
        </Box>
      </Text>
    </LinkBox>
  );
};

export default PostCard;
