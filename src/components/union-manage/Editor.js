import React from 'react';
import styled from 'styled-components';

import EditorJS from '@editorjs/editorjs';
import { useEffect } from 'react';

const Editor = () => {
  
  useEffect(() => {
    const editor = new EditorJS('unifolio-editorjs');  
  }, []);
  
  return <EditorContainer id="unifolio-editorjs"></EditorContainer>;
};

const EditorContainer = styled.div`
  border-bottom: 1px solid #C8C5C5;
  
  .ce-block__content, .ce-toolbar__content {
    max-width: 100%;  /* example value, adjust for your own use case */
  }
  .codex-editor__redactor {
    padding-bottom: 0px !important;
  }
`;

export default Editor;
