
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "# Escribe tu código de diagrama aquí",
  className = ""
}) => {
  return (
    <div className={`flex-1 ${className}`}>
      <CodeMirror
        value={value}
        height="100%"
        extensions={[markdown()]}
        onChange={onChange}
        theme={oneDark}
        basicSetup={{ 
          lineNumbers: true, 
          highlightActiveLine: true,
          searchKeymap: true,
          autocompletion: true,
          closeBrackets: true,
          foldGutter: true
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CodeEditor;
