import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { IPost } from './types';
import { useAuth } from '../auth/AuthProvider';
import { FaTrash } from 'react-icons/fa';
import { useDeletePost } from './api/useDeletePost';
import DeletePost from './DeletePost';
import EditPostBtn from './EditPostBtn';

const PostCard = (post: IPost) => {
  const { user } = useAuth();
  const { title, author, likes, _id, createdAt } = post;

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
      <HStack justifyContent='space-between'>
        <Box as='time' dateTime={createdAt} fontSize='sm' color='gray.600'>
          {formatDistanceToNow(new Date(createdAt))} ago
        </Box>
        {user && user._id === author?._id ? (
          <HStack zIndex={2}>
            <EditPostBtn post={post} size='xs' />
            <DeletePost
              authorId={author._id}
              postId={_id}
              triggerButton={
                <IconButton
                  icon={<FaTrash />}
                  aria-label='delete post'
                  colorScheme='red'
                  size='xs'
                  variant='outline'
                />
              }
            />
          </HStack>
        ) : null}
      </HStack>
      <Heading
        as='h3'
        maxH='3em'
        textOverflow='ellipsis'
        overflow='hidden'
        fontSize='2xl'
        title={title}
        mt={4}
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
