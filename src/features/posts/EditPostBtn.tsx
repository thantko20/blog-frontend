import { IconButton } from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IPost } from './types';

interface EditPostBtnProps {
  post: IPost;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const EditPostBtn = ({ post, size = 'md' }: EditPostBtnProps) => {
  const navigate = useNavigate();

  return (
    <IconButton
      icon={<FaEdit />}
      onClick={() => navigate('/posts/edit', { state: post })}
      size={size}
      aria-label='edit post'
    />
  );
};

export default EditPostBtn;
