import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { IPost } from './types';
import { useAuth } from '../auth/AuthProvider';

const PostCard = ({ title, author, likes, _id, createdAt }: IPost) => {
  const { user } = useAuth();
  return (
    <LinkBox
      as='article'
      w='full'
      boxShadow='md'
      p='1rem'
      rounded='md'
      role='group'
      bgColor='whiteAlpha.900'
    >
      <Box as='time' dateTime={createdAt} fontSize='sm' color='gray.600'>
        {formatDistanceToNow(new Date(createdAt))} ago
      </Box>
      <Heading
        as='h3'
        maxH='3em'
        // whiteSpace="nowrap"
        textOverflow='ellipsis'
        overflow='hidden'
        fontSize='2xl'
        title={title}
      >
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
      <Text mt={1} fontSize='sm'>
        by{' '}
        <Box as='span' fontWeight='semibold'>
          {author?.fullname} {user?._id === author?._id && '(You)'}
        </Box>
      </Text>
    </LinkBox>
  );
};

export default PostCard;
