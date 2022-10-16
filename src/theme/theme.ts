import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { withProse } from '@nikolovlazar/chakra-ui-prose';

const theme = extendTheme(
  {
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          color: mode('gray.900', 'gray.100')(props),
          bg: mode('gray.50', 'gray.900')(props),
          '.ProseMirror': {
            minHeight: '12rem',
            maxHeight: '20rem',
            overflow: 'auto',
            backgroundColor: 'white',
            outline: 'none',
            padding: '0.5rem',
          },
          '.ProseMirror, .prose': {
            '> * + *': {
              mt: '0.75em',
            },
            'ul, ol': {
              padding: '0 1rem',
            },
            'h1, h2, h3, h4, h5, h6': {
              lineHeight: 1.1,
              fontWeight: 'semibold',
              color: 'gray.900',
            },
            h1: {
              fontSize: '2.25rem',
              fontWeight: 'bold',
            },
            h2: {
              fontSize: '1.75rem',
            },
            h3: {
              fontSize: '1.5rem',
            },
            h4: {
              fontSize: '1.25rem',
            },
            a: {
              textDecoration: 'underline',
              color: 'blue.400',
            },
            code: {
              backgroundColor: 'gray.200',
              color: 'gray.700',
            },
            pre: {
              background: '#0D0D0D',
              color: '#FFF',
              fontFamily: 'JetBrainsMono, monospace',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              code: {
                color: 'inherit',
                padding: 0,
                background: 'none',
                fontSize: '0.8rem',
              },
            },
            img: {
              maxWidth: '100%',
              height: 'auto',
            },
            blockquote: {
              paddingLeft: '1rem',
              borderLeft: '2px solid rgba(#0D0D0D, 0.1)',
              margin: '2rem 0',
            },
          },
        },
      }),
    },
  },
  withProse()
);

export default theme;
