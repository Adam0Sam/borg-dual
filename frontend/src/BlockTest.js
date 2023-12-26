import { BlocksRenderer } from '@strapi/blocks-react-renderer';

// Content should come from your Strapi API
const content = [
    {
        type: 'paragraph',
        children: [{ type: 'text', text: 'A simple paragraph' }],
    },
];

const BlockTest = () => {
    return (
        <BlocksRenderer
            content={content}
        />
    );
};