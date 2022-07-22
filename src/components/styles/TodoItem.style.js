import styled from "styled-components";

export const Todo = styled.div`
  border: 1px solid #ccc;
  & + & {
    margin-top: 10px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 1px 1px 3px #ccc;
`;

export const TodoContent = styled.div`
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
  `}
`;

export const DeleteButton = styled.button`
  font-family: "ubuntu";
  margin-right: 10px;
  width: 80px;
  background: #c8553d;
  color: white;
  border-radius: 3px;
  border: none;
  box-shadow: 1px 1px 3px #666;
  padding: 5px;
`;

export const CheckButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: #73a6ad;
  color: white;
  border-radius: 3px;
  border: none;
  box-shadow: 1px 1px 3px #666;
  padding: 5px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
