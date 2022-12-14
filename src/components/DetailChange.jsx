import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos, __putTodos } from "../redux/modules/todosSlice";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./elements/Button";
import Textarea from "./elements/Textarea";
import useTextarea from "../hooks/useTextarea";

const DetailChange = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, todos } = useSelector((state) => state.todos);
  const todo = todos.find((todo) => todo.id === parseInt(param.id));

  // custom hook 사용(useInput)
  const [updateContent, handleContent] = useTextarea("");

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      __putTodos({
        ...todo,
        id: param.id,
        content: updateContent,
      })
    );
    dispatch(__getTodos())
    navigate(`/detail/${param.id}`);
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <DetailTotal onSubmit={onSubmitHandler}>
      <DetailContainer>
        <DetailTop>
          <div>
            <div>{todo.title}</div>
          </div>
        </DetailTop>
        <StTextArea>
          <div>
            <Textarea
              // key={todo.id}
              value={updateContent}
              onChange={handleContent}
              rows='10'
              maxLength='200'
              width='100%'
              height='200px'
            />
          </div>
        </StTextArea>
        <DetailBottom>
          <Button type='submit' btntype='basic'>
            저장
          </Button>
        </DetailBottom>
      </DetailContainer>
      <DetailComment onClick={() => {}}>눌러서 댓글보기</DetailComment>
    </DetailTotal>
  );
};
export default DetailChange;

const DetailTotal = styled.form``;

const DetailContainer = styled.div`
  /* height: calc(100vh - 45px); */
  background-color: rgb(255, 255, 255);
  padding: 24px;
`;

const DetailTop = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 32px;
`;

const StTextArea = styled.div``;
const DetailBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 50px;
  min-height: 550px;
`;

const DetailComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 50px;
  padding: 0px 12px;
  border-top: 1px solid rgb(238, 238, 238);
`;
