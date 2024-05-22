import React, { useRef } from 'react';

const SearchTextarea = ({ field, placeholder, register }) => {
  const textAreaRef = useRef();

  const handleResizeTextarea = () => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current.firstElementChild;
      textArea.style.height = 0;
      textArea.style.height = textArea.scrollHeight + "px";
    }
  }

  return (
    <div className="search-input-container" ref={textAreaRef}>
      <textarea
        className="search-input search-textarea"
        onInput={handleResizeTextarea}
        placeholder={placeholder}
        {...register(field)}
        type="text"
      />
    </div>
  )
}

export default SearchTextarea;
