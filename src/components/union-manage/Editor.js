import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import EditorJS from '@editorjs/editorjs';
import API from 'lib/api';

const Editor = ({noticePrimaryInfo = null}) => {
  const editorInstance = useRef();
  const $postTitle = useRef();

  useEffect(() => {
    editorInstance.current = new EditorJS('unifolio-editorjs');
  }, []);
  
  const handleClickSubmit = () => {
    editorInstance.current.save().then((outputData) => {
      console.log($postTitle.current.value)
      console.log('Article data: ', outputData)
      let content = ""; 
      outputData.blocks.forEach(({ data }) => {
        content += data.text + '\n'
      })
      
      const postData = {
        pno: 3,
        password: String(1234),
        title: $postTitle.current.value,
        content: content,
        is_notice: true,
        union: Number(noticePrimaryInfo && noticePrimaryInfo.unionId),
        writer: Number(noticePrimaryInfo&& noticePrimaryInfo.userId),
      }
      API.post.posts(postData)

    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }
  return (
    <EditorComponentLayout>
      <input ref={$postTitle} type="text" name="post-title" placeholder="대화 제목"/>
      <EditorLayer id="unifolio-editorjs"></EditorLayer>
      <EditorToolBoxLayer>
        <button onClick={handleClickSubmit}>보내기</button>
      </EditorToolBoxLayer>
    </EditorComponentLayout>
  )
  
};

const EditorComponentLayout = styled.div`
  padding: 16px;
  border-bottom: 1px solid #C8C5C5;

  & > input {
    width: 70%;
    border: none;
    border-bottom: 1px solid #C8C5C5;

  }
`;

const EditorLayer = styled.div`
  .ce-block__content, .ce-toolbar__content {
    max-width: 100%;  /* example value, adjust for your own use case */
  }
  .codex-editor__redactor {
    padding-bottom: 0px !important;
  }
`;

const EditorToolBoxLayer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

export default Editor;