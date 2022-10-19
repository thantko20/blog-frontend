import {
  ButtonProps,
  IconButtonProps,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from '@chakra-ui/react';
import { cloneElement, ReactElement } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { useDeletePost } from './api/useDeletePost';

interface DeletePostProps {
  postId: string;
  triggerButton: ReactElement<IconButtonProps | ButtonProps>;
  authorId: string;
}

const DeletePost = ({ postId, triggerButton, authorId }: DeletePostProps) => {
  const { user } = useAuth();
  const mutation = useDeletePost();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickDelete = async () => {
    if (user && user._id === authorId) {
      await mutation.mutateAsync(postId);
      onClose();
      toast({
        title: 'Post successfully deleted.',
        position: 'top',
        status: 'success',
        isClosable: true,
        duration: 5000,
      });
    }
  };

  const button = cloneElement(triggerButton, {
    onClick: onOpen,
  });
  return (
    <>
      {button}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={onClose}
              variant='outline'
            >
              Cancel
            </Button>
            <Button
              variant='ghost'
              onClick={onClickDelete}
              colorScheme='red'
              isLoading={mutation.isLoading}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletePost;
