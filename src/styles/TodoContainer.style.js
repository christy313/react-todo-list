import styled from "styled-components";

export const TodoWrapper = styled.div`
  font-family: "ubuntu";
  margin: 30px auto;
  width: 480px;
  border: 3px solid #f5f5f5;
  border-radius: 5px;
  padding: 30px;
  text-align: center;
  box-shadow: 3px 3px 5px #ccc;
`;

export const Title = styled.h1`
  color: #28262c;
  font-size: 48px;
`;

export const CreateTodo = styled.div`
  margin: 20px auto;
`;

export const TodoInput = styled.input`
  margin-right: 10px;
  width: 300px;
  height: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 3px #ccc;
  padding: 6px;
  font-size: 16px;
`;

export const AllButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: #39393a;
  color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
`;

export const ActiveButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: #ffe74c;
  color: #333;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
  margin: 0 10px;
`;

export const CompletedButton = styled.button`
  font-family: "ubuntu";
  width: 80px;
  background: #666;
  color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
`;

export const TodoList = styled.div`
  margin-top: 10px;
`;

export const ClearTodo = styled.button`
  font-family: "ubuntu";
  width: 120px;
  background: #c8553d;
  color: white;
  border-radius: 3px;
  box-shadow: 1px 1px 3px #666;
  border: none;
  padding: 5px;
  margin: 10px;
`;
