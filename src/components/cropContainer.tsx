import React, { useState, useCallback } from 'react';
import Header from './header';
import styled from 'styled-components';
import UploadArea from './uploadArea';
import ImageContainer from './imageContainer';

interface CropContainerProps {
  setRectangles: (data: any) => void;
  rectangles: any[];
}

const CropContainer: React.FC<CropContainerProps> = ({
  setRectangles,
  rectangles,
}) => {
  const [imgData, setImgData] = useState({
    url: '',
    file: {},
    width: 0,
    height: 0,
    scale: 0,
  });

  const handleImageChange = useCallback((url: string, file: File) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const scale = 357 / img.width;
      setImgData({
        url: url,
        file: file,
        width: img.width,
        height: img.height,
        scale,
      });
    };
  }, []);
  return (
    <Wrap>
      <Header />

      <CropBody>
        {imgData.url && imgData.file ? (
          <ImageContainer
            imgData={imgData}
            setRectangles={setRectangles}
            rectangles={rectangles}
          />
        ) : (
          <UploadArea handleImageChange={handleImageChange} />
        )}
      </CropBody>
    </Wrap>
  );
};

export default CropContainer;

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => props.theme.border_radius};
  box-shadow: ${(props) => props.theme.box_shadow};
  min-width: 433px;
  min-height: 792px;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  background: ${(props) => props.theme.main_background_color};
`;

const CropBody = styled.div`
  margin-top: 100px;
`;
