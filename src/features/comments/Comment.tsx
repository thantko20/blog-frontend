import { Box, HStack, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { IComment } from './types';

const Comment = ({
  _id,
  author,
  content,
  likes,
  postId,
  createdAt,
}: IComment) => {
  return (
    <Box bgColor='white' rounded='sm' p={4} boxShadow='md'>
      <HStack>
        <Text>{author.fullname}</Text>
        &bullet;
        <Box as='time'>
          {format(new Date(createdAt), "'at' H:mm 'on' do MMM yyyy")}
        </Box>
      </HStack>
      <Box
        mt={4}
        dangerouslySetInnerHTML={{ __html: content }}
        className='prose'
      ></Box>
    </Box>
  );
};

export default Comment;
