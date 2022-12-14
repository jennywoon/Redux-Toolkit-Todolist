import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { __deleteTodos } from "../redux/modules/todosSlice";
import Button from "./elements/Button";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickDeleteButtonHandler = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    if (window.confirm("삭제하시겠습니까?")) dispatch(__deleteTodos(todo.id));

    // useState로 todos를 변경시켜서 리렌더링 vs 서버에서 다시 fetch하는 것
  };

  return (
    <StTodoContainer
      onClick={() => {
        navigate(`/detail/${todo.id}`);
        // `/detail/${todo.id}` 요렇게 수정해야 한다.
      }}
    >
      <StTodo>
        <StTodoTitle>{todo.title}</StTodoTitle>
        {/* <StTodobutton type='button' onClick={onClickDeleteButtonHandler}>
          <DeleteIcon />
        </StTodobutton> */}
        <Button uibutton="delete" btntype="ui-list" onClick={onClickDeleteButtonHandler} />
        {/* <Button bordercolor="rgb(221,221,221)" bgcolor="white" width="30px" height="30px" > */}
        {/* <DeleteIcon />
        </Button> */}
      </StTodo>
      <StTodoUsername>작성자: {todo.username}</StTodoUsername>
    </StTodoContainer>
  );
};

export default Todo;

const StTodoContainer = styled.div`
  box-sizing: border-box;
  padding: 12px;
  height: 90px;
  border: 1px solid rgb(221, 221, 221);
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  width: 100%;
  margin-bottom: 12px;
`;
const StTodo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
const StTodoTitle = styled.div`
  font-size: 20px;
`;

const StTodoUsername = styled.div`
  font-size: 10px;
  width: 100%;
`;
