import React, { useRef, useCallback, memo } from 'react';
import styled from 'styled-components';
import { FaImage } from 'react-icons/fa';

interface UploadAreaState {
  handleImageChange: (url: string, file: File) => void;
}

const UploadArea: React.FC<UploadAreaState> = ({ handleImageChange }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const handleClick = useCallback(() => {
    if (fileInput && fileInput.current) {
      fileInput.current.click();
    }
  }, []);
  const handleFileInput = useCallback(
    (e) => {
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      handleImageChange(url, file);
    },
    [handleImageChange],
  );
  return (
    <UploadContainer onClick={handleClick}>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileInput}
      />
      <FaImage />
      <p>Upload Image</p>
    </UploadContainer>
  );
};

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 355px;
  height: 156px;
  color: ${(props) => props.theme.font_color};
  background: #fff;
  margin: 0 auto;
  cursor: pointer;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.border_radius};
`;

export default memo(UploadArea);
