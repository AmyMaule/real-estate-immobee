import React, { useRef } from 'react';

const SearchTextarea = ({ handleUpdateHeight, register }) => {
  const textAreaRef = useRef();

  const handleResizeTextarea = () => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current.firstElementChild;
      textArea.style.height = 0;
      textArea.style.height = textArea.scrollHeight + "px";
      handleUpdateHeight();
    }
  }

  return (
    <div className="search-input-container" ref={textAreaRef}>
      <textarea
        className="search-input search-textarea"
        onInput={handleResizeTextarea}
        placeholder="Enter search keywords"
        {...register("keywords")}
        type="text"
      />
    </div>
  )
}

export default SearchTextarea;
