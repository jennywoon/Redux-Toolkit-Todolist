import React from "react";
import styled from "styled-components";

const Textarea = (props) => {
  const {
    maxLength,
    title,
    label,
    id,
    name,
    value,
    onChange,
    placeholder,
    width,
    height,
  } = props;

  return (
    <TextareaWrap>
      <Stlabel>{label}</Stlabel>
      <StTextarea
        maxLength={maxLength}
        title={title}
        id={id}
        type='text'
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        width={width}
        height={height}
      />
    </TextareaWrap>
  );
};

export default Textarea;

const TextareaWrap = styled.div`
  width: 100%;
`;

const Stlabel = styled.label`
  display: block;
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
`;

const StTextarea = styled.textarea`
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  resize: none;
  box-sizing: border-box;
  border: 1px solid rgb(238, 238, 238);
  margin-bottom: 40px;
  width: ${({ width }) => `${width}`};
  height: ${({ height }) => `${height}`};
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  outline-color: rgb(254, 83, 31);
  :hover {
    border: 1px solid rgb(254, 83, 31);
  }
`;
