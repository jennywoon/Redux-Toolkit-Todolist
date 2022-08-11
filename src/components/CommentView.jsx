import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __deleteComment, __updateComment } from "../redux/modules/todosSlice";
import Button from "./elements/Button";
import Input from "./elements/Input";

const CommentView = ({ comment }) => {
  const dispatch = useDispatch();

  const [editComment, setEditComment] = React.useState(false);

  let updateCommentInput = () => {
    if (editComment) {
      setEditComment(false);
    } else {
      setEditComment(true);
    }
  };

  const deleteBtn = (id) => {
    if(window.confirm("댓글을 삭제하시겠습니까?")){
      dispatch(__deleteComment(id));
    }
  };

  const [updateComment, setUpdateComment] = useState({
    id: "",
    userContent: comment.userContent,
  });

  const changeEvent = (e) => {
    setUpdateComment({
      id: comment.id,
      userContent: e.target.value,
    });
  };

  const updateCommentAction = () => {
    dispatch(__updateComment(updateComment));
    updateCommentInput();
  };
  return (
    <>
      <div>
        <CommentBox>
          <CommentContent>
            {!editComment ? (
              <div>
                <CommentTop className="comment_view">{comment.userName}</CommentTop>
                <CommentBottom className="comment_view">{comment.userContent}</CommentBottom>
              </div>
            ) : (
              <Input onChange={changeEvent} name="userContent" type="text" value={updateComment.userContent}/>
            )}
          </CommentContent>
          <CommentButton>
            {!editComment ? (
              <div>
                <Button
                  uibutton="edit"
                  btntype="ui-comment"
                  onClick={() => {
                    updateCommentInput();
                  }}
                />
                <Button
                  uibutton="delete"
                  btntype="ui-comment"
                  onClick={() => {
                    deleteBtn(comment.id);
                  }}
                />
              </div>
            ) : (
              <div>
                <Button
                  btntype="ui-comment"
                  onClick={() => {
                    updateCommentInput();
                  }}
                >
                  취소
                </Button>
                <Button
                  btntype="ui-comment"
                  onClick={() => {
                    updateCommentAction();
                  }}
                >
                  저장
                </Button>
              </div>
            )}
          </CommentButton>
        </CommentBox>
      </div>
    </>
  );
};

export default CommentView;

const CommentBox = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
`;
const CommentContent = styled.div`
  width: 80%;
`;

const CommentTop = styled.div`
  font-size: 10px;
`;
const CommentBottom = styled.div`
  font-size: 15px;
`;

const CommentButton = styled.div`
  display: flex;
  margin: 3px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
