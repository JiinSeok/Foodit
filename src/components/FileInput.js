import { useRef } from "react";

function FileInput({ name, value, onChange }) {
  const inputRef = useRef(); // DOM에 직접 접근

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  return (
    <div>
      <input type='file' onChange={handleChange} ref={inputRef} />
      {value && (
        <button type='button' onClick={handleClearClick}>
          초기화
        </button>
      )}
    </div>
  );
}

export default FileInput;
