import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState, trashState } from "../atoms";

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 300px;
  input {
    width: 100%;
  }
`;

const Input = styled.input`
  border-style: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 30px;
  text-align: center;
  ::placeholder {
    color: ${(props) => props.theme.boardColor};
  }
`;

interface IForm {
  boardId: string;
}

function CreateForm() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const addBoard = useSetRecoilState(toDoState);
  const addTrash = useSetRecoilState(trashState);
  const onValid = ({ boardId }: IForm) => {
    addBoard((tasks) => {
      return { ...tasks, [boardId]: [] };
    });
    addTrash((tasks) => {
      return { ...tasks, [boardId]: [] };
    });
    setValue("boardId", "");
  };
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("boardId", { required: true })}
          type="text"
          placeholder="Create Board: Enter BoardName"
        />
      </Form>
    </Wrapper>
  );
}

export default CreateForm;
