import {
  Box,
  Flex,
  IconButton,
  Button,
  ButtonProps,
  useBoolean,
  useColorModeValue,
  IconButtonProps,
} from '@chakra-ui/react';
import TiptapLink from '@tiptap/extension-link';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
} from 'react-icons/fa';
import { BiCodeBlock } from 'react-icons/bi';
import { SubmitHandler, ChangeHandler } from 'react-hook-form';

const useToolSettings = (editor: Editor) => {
  return {
    toggleBold() {
      editor.chain().focus().toggleBold().run();
    },
    toggleHeading2() {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    },
    toggleHeading3() {
      editor.chain().focus().toggleHeading({ level: 3 }).run();
    },
    toggleItalic() {
      editor.chain().focus().toggleItalic().run();
    },
    toggleBullet() {
      editor.chain().focus().toggleBulletList().run();
    },
    toggleOrderedList() {
      editor.chain().focus().toggleOrderedList().run();
    },
    toggleCode() {
      editor.chain().focus().toggleCode().run();
    },
    setLink() {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('URL', previousUrl);

      if (url === null) {
        return;
      }

      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    },
    toggleCodeBlock() {
      editor.chain().focus().toggleCodeBlock().run();
    },
  };
};

interface IToolbarBtnProps extends IconButtonProps {
  isActiveSetting?: boolean;
}

const ToolbarBtn = ({
  onClick,
  isActiveSetting,
  ...props
}: IToolbarBtnProps) => {
  const variant = isActiveSetting ? 'solid' : 'outline';

  return (
    <IconButton
      onClick={onClick}
      variant={variant}
      size='xs'
      colorScheme='facebook'
      border='none'
      borderRadius='sm'
      {...props}
    />
  );
};

const Toolbar = ({ editor }: { editor: Editor }) => {
  const {
    toggleBold,
    setLink,
    toggleBullet,
    toggleCode,
    toggleHeading2,
    toggleItalic,
    toggleOrderedList,
    toggleCodeBlock,
  } = useToolSettings(editor);

  return (
    <Flex
      wrap='wrap'
      gap={0}
      justifyContent='flex-start'
      borderBottom='1px'
      borderColor='blackAlpha.200'
    >
      <ToolbarBtn
        onClick={toggleBold}
        isActiveSetting={editor.isActive('bold')}
        icon={<FaBold />}
        aria-label='bold'
      />
      <ToolbarBtn
        onClick={toggleItalic}
        isActiveSetting={editor.isActive('italic')}
        icon={<FaItalic />}
        aria-label='italic'
      />
      <ToolbarBtn
        onClick={toggleHeading2}
        isActiveSetting={editor.isActive('heading', { level: 2 })}
        icon={<FaHeading />}
        aria-label='heading'
      />
      <ToolbarBtn
        onClick={toggleBullet}
        isActiveSetting={editor.isActive('bulletlist')}
        icon={<FaListUl />}
        aria-label='bulletlist'
      />
      <ToolbarBtn
        onClick={toggleOrderedList}
        isActiveSetting={editor.isActive('orderedList')}
        icon={<FaListOl />}
        aria-label='ordered list'
      />
      <ToolbarBtn
        onClick={toggleCode}
        isActiveSetting={editor.isActive('code')}
        icon={<FaCode />}
        aria-label='code'
      />
      <ToolbarBtn
        onClick={toggleCodeBlock}
        isActiveSetting={editor.isActive('codeBlock')}
        icon={<BiCodeBlock />}
        aria-label='codeblock'
      />
      <ToolbarBtn onClick={setLink} icon={<FaLink />} aria-label='link' />
    </Flex>
  );
};

interface TextEditorProps {
  onChange: (value: string) => void;
  placeholder?: string;
  initialContent?: string;
}

const TextEditor = ({
  onChange,
  placeholder = '',
  initialContent = '',
}: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      TiptapLink.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <Box
      border='1px'
      borderColor='gray.300'
      borderRadius='base'
      overflow='hidden'
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} placeholder={placeholder} />
    </Box>
  );
};

export default TextEditor;
