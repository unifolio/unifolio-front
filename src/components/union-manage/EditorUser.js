import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import EditorJS from "@editorjs/editorjs";
import API from "lib/api";

const EditorUser = ({ noticePrimaryInfo = null, modifyingInfo = null }) => {
  const editorInstance = useRef();
  const $postTitle = useRef();
  const $postFiles = useRef([]);
  const [isValid, setIsValid] = useState(true);
  if(modifyingInfo) console.log("modifyingInfo", modifyingInfo)

  useEffect(() => {
    editorInstance.current = new EditorJS({
      holder: "unifolio-editorjs",
      // holder: modifyingInfo ? `editor-post-${modifyingInfo.post_id}` : "unifolio-editorjs", 
      placeholder: modifyingInfo && modifyingInfo.content
    });
    $postTitle.current.value = modifyingInfo && modifyingInfo.title;
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
          is_notice: false,
          writer: modifyingInfo ? Number(modifyingInfo.writer_id) : Number(noticePrimaryInfo && noticePrimaryInfo.userId),
        };
        if (noticePrimaryInfo) postData.union = Number(noticePrimaryInfo.unionId);
        if (modifyingInfo) postData.post_id = Number(modifyingInfo.post_id)

        if (modifyingInfo) {
          API.patch.posts(postData).then(response => {
            if (response.status === 200) {
              alert("수정이 완료되었습니다.");
              window.location.reload();
            }
          })
        } else {
          API.post.posts(postData).then((response) => {
            if (response.status === 201) {
              alert("작성이 완료되었습니다.");
              window.location.reload();
            }
          });
        }
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

export default EditorUser;
