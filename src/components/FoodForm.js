import { useState } from "react";
import FileInput from "./FileInput";

function FoodForm() {
  const [values, setValues] = useState({
    imgFile: null,
    title: "",
    calorie: 0,
    content: "",
  });

  const sanitize = (type, value) => {
    switch (type) {
      case "number": // type이 number인 경우만 따로 처리
        return Number(value) || 0;

      default:
        return value;
    }
  };

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      // 이 값을 활용해서 values 스테이트를 변경
      ...preValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target; // e.target 값을 name 과 value 로 Destructuring
    handleChange(name, sanitize(value, type));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // submit 하면 값이 날아가는 HTML 폼의 기본 동작을 막아줌
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name='imgFile'
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name='title'
        value={values.title}
        onChange={handleInputChange}
      ></input>
      <input
        type='number'
        name='calorie'
        value={values.calorie}
        onChange={handleInputChange}
      ></input>
      <input
        name='content'
        value={values.content}
        onChange={handleInputChange}
      ></input>
      <button type='submit'>확인</button>
    </form>
  );
}

export default FoodForm;
