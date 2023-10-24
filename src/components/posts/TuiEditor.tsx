import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ja-jp';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import { useEffect, useState } from 'react';
import 'tui-color-picker/dist/tui-color-picker.css';

interface TuiEditorProps {
  content: string;
  editorRef: React.MutableRefObject<Editor | null>;
  onChange: () => void;
  onClick: () => void;
}

const TuiEditor = ({
  content = '',
  editorRef,
  onChange,
  onClick,
}: TuiEditorProps) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {}, [content]);

  return (
    <>
      {editorRef && (
        <div className="relative w-full">
          <Editor
            ref={editorRef}
            initialValue={content || ' '}
            initialEditType="markdown" // wysiwyg & markdown
            previewStyle={windowWidth >= 1080 ? 'vertical' : 'tab'} // tab, vertical
            hideModeSwitch={true}
            height="400px"
            theme={''} // '' & 'dark'
            usageStatistics={false}
            toolbarItems={toolbarItems}
            useCommandShortcut={true}
            language="ja-JP"
            onChange={onChange}
            onClick={onClick}
            plugins={[
              colorSyntax,
              [codeSyntaxHighlight, { highlighter: Prism }],
            ]}
          />
        </div>
      )}
    </>
  );
};

export default TuiEditor;
