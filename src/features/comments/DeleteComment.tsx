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
import { useDeleteComment } from './api/useDeleteComment';

interface DeleteCommentProps {
  commentId: string;
  triggerButton: ReactElement<IconButtonProps | ButtonProps>;
  authorId: string;
  postId: string;
  onSuccess?: () => void;
}

const DeletePost = ({
  commentId,
  triggerButton,
  authorId,
  onSuccess,
  postId,
}: DeleteCommentProps) => {
  const { user } = useAuth();
  const mutation = useDeleteComment();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickDelete = async () => {
    if (user && user._id === authorId) {
      await mutation.mutateAsync({ postId, commentId });
      onClose();
      toast({
        title: 'Comment deleted.',
        position: 'top',
        status: 'success',
        isClosable: true,
        duration: 5000,
      });
      onSuccess && onSuccess();
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
          <ModalHeader>Delete Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete this comment? This action cannot
              be undone.
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
