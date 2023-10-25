import Label from '@/components/ui/Label';
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
import { useEffect, useRef, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import 'tui-color-picker/dist/tui-color-picker.css';

interface TuiEditorProps {
  content: string;
  editorRef: React.MutableRefObject<Editor | null>;
  onChange: () => void;
}

const TuiEditor = ({ content = '', editorRef, onChange }: TuiEditorProps) => {
  const [isActive, setIsActive] = useState(false);
  const {
    formState: { errors },
  } = useForm<FieldValues>({});
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  const handleEditorBlur = () => {
    setIsActive(false);
  };
  const handleEditorFocus = () => {
    setIsActive(true);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const editorWrapperRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {editorRef && (
        <div
          className={`editor relative w-full ${isActive ? 'active' : ''}`}
          ref={editorWrapperRef}
        >
          <Label label="内容" errors={errors} />
          <div className="mb-2" />
          <Editor
            ref={editorRef}
            initialValue={content || ' '}
            initialEditType="markdown" // wysiwyg & markdown
            previewStyle={windowWidth >= 1080 ? 'vertical' : 'tab'}
            hideModeSwitch={true}
            height="400px"
            theme={''} // '' & 'dark'
            usageStatistics={false}
            toolbarItems={toolbarItems}
            useCommandShortcut={true}
            language="ja-JP"
            onBlur={handleEditorBlur}
            onFocus={handleEditorFocus}
            onChange={onChange}
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
