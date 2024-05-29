import { useState } from 'react';
import FileInput from './FileInput';
import { createFood } from '../api';

const INITIAL_VALUES = {
  imgFile: null,
  title: '',
  calorie: 0,
  content: '',
};

const sanitize = (type, value) => {
  switch (type) {
    case 'number': // type이 number인 경우만 따로 처리
      return Number(value) || 0;

    default:
      return value;
  }
};

function FoodForm({
  initialPreview,
  initialValues = INITIAL_VALUES,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      // 이 값을 활용해서 values 스테이트를 변경
      ...preValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target; // e.target 값을 name 과 value 로 Destructuring
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // submit 하면 값이 날아가는 HTML 폼의 기본 동작을 막아줌
    const formData = new FormData();
    formData.append('imgFile', values.imgFile);
    formData.append('title', values.title);
    formData.append('calorie', values.calorie);
    formData.append('content', values.content);

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData); // createFood 또는
    } catch (error) {
      setSubmittingError(error);
    } finally {
      setIsSubmitting(false);
    }
    const { food } = result;
    onSubmitSuccess(food); // handleCreateSuccess 또는
    setValues(INITIAL_VALUES);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        initialPreview={initialPreview}
        value={values.imgFile}
        onChange={handleChange}
      />
      <input
        name="title"
        value={values.title}
        onChange={handleInputChange}
      ></input>
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={handleInputChange}
      ></input>
      <input
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></input>
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {onCancel && ( // handleCancel
        <button type="button" onClick={onCancel}>
          취소
        </button>
      )}
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default FoodForm;
