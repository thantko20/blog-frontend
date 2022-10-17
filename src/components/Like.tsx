import { HStack, IconButton, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

interface LikeProps {
  hasLiked: boolean;
  onClickLike: () => void;
  likesCount: number;
  likes: string[];
}

const Like = ({ hasLiked, onClickLike, likesCount, likes }: LikeProps) => {
  return (
    <HStack
      spacing={2}
      bgColor='white'
      px={3}
      py={0.5}
      maxW='max-content'
      rounded='full'
      boxShadow='md'
    >
      <IconButton
        icon={
          <FaHeart
            stroke={hasLiked ? 'transparent' : 'black'}
            strokeWidth='36px'
            fill={hasLiked ? 'currentColor' : 'transparent'}
          />
        }
        aria-label='like'
        onClick={onClickLike}
        variant='ghost'
        colorScheme='red'
        rounded='full'
        size='sm'
      />
      <Text fontWeight='bold' fontSize='sm'>
        {likesCount}
      </Text>
    </HStack>
  );
};

export default Like;
