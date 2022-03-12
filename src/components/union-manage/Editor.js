import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import EditorJS from "@editorjs/editorjs";
import API from "lib/api";

const Editor = ({ noticePrimaryInfo = null }) => {
  const editorInstance = useRef();
  const $postTitle = useRef();
  const $postFiles = useRef([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    editorInstance.current = new EditorJS("unifolio-editorjs");
  }, []);

  const handleChangeFile = (e) => {
    if (e.target.files.length > 5) {
      alert("업로드 가능한 파일은 5개입니다.");
      setIsValid(false);
    } else {
      $postFiles.current = [...e.target.files];
      setIsValid(true);
    }
  };

  const handleClickSubmit = () => {
    editorInstance.current
      .save()
      .then((outputData) => {
        console.log($postTitle.current.value);
        console.log("Article data: ", outputData);
        let content = "";
        outputData.blocks.forEach(({ data }) => {
          content += data.text + "\n";
        });

        const postData = {
          pno: 3,
          password: String(1234),
          title: $postTitle.current.value,
          content: content,
          is_notice: true,
          union: Number(noticePrimaryInfo && noticePrimaryInfo.unionId),
          writer: Number(noticePrimaryInfo && noticePrimaryInfo.userId),
        };

        if ($postFiles.current?.length !== 0) {
          console.log("$postFiles.current", $postFiles.current);
          $postFiles.current.forEach((file, i) => {
            postData[`post_file${i + 1}`] = file;
          });
        }

        API.post.posts(postData).then((response) => {
          if (response.status === 201) {
            alert("공지사항 작성이 완료되었습니다.");
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        console.log("Saving failed: ", error);
      });
  };

  return (
    <EditorComponentLayout>
      <input
        ref={$postTitle}
        type="text"
        name="post-title"
        placeholder="대화 제목"
      />
      <EditorLayer id="unifolio-editorjs"></EditorLayer>
      <EditorToolBoxLayer>
        <div>
          파일 업로드 :
          <input
            type="file"
            id="staged_files"
            onChange={handleChangeFile}
            multiple
          />
        </div>
      </EditorToolBoxLayer>
      <EditorToolBoxLayer>
        <button disabled={!isValid} onClick={handleClickSubmit}>
          보내기
        </button>
      </EditorToolBoxLayer>
    </EditorComponentLayout>
  );
};

const EditorComponentLayout = styled.div`
  padding: 16px;
  border-bottom: 1px solid #c8c5c5;

  & > input {
    width: 70%;
    border: none;
    border-bottom: 1px solid #c8c5c5;
  }
`;

const EditorLayer = styled.div`
  .ce-block__content,
  .ce-toolbar__content {
    max-width: 100%; /* example value, adjust for your own use case */
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
