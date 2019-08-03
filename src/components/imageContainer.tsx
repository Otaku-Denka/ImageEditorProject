import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Stage, Layer, Image, Rect } from 'react-konva';
import useImage from '../utils/useImage';
import SelectionItem from './selectionItem';

interface ImageContainerProps {
  imgData: {
    url: string;
    file: File | object;
    width: number;
    height: number;
    scale: number;
  };
  setRectangles: (rectangle: any) => any;
  rectangles: any[];
}

const ImageContainer: React.FC<ImageContainerProps> = ({
  imgData,
  setRectangles,
  rectangles,
}) => {
  const { width, height, scale, url } = imgData;
  const mouseDownOnCrop = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [image] = useImage(url);

  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  const componentData = useRef({
    componentX: 0,
    componentY: 0,
    componentHeight: 0,
    componentWidth: 0,
    clientStartX: 0,
    clientStartY: 0,
  });

  const [selectedId, selectShape] = useState(0);
  const rectId = useRef(0);
  const onMouseTouchDown = (e: any) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();
    mouseDownOnCrop.current = true;
    const { pageX, pageY } = e.evt;
    if (componentRef && componentRef.current) {
      let {
        top,
        left,
        width,
        height,
      } = componentRef.current.getBoundingClientRect();
      componentData.current = {
        componentX: left,
        componentY: top,
        componentHeight: height,
        componentWidth: width,
        clientStartX: pageX,
        clientStartY: pageY,
      };
    }
  };
  const onMouseTouchMove = (e: MouseEvent) => {
    if (mouseDownOnCrop && mouseDownOnCrop.current) {
      //
      const { pageX, pageY } = e;
      setPos((pos) => {
        return { x: pageX, y: pageY };
      });
    }
  };

  const onSelect = (id: number) => {
    selectShape(id);
  };
  const onChange = (newAttrs: any) => {
    const rects = rectangles.slice();
    const newRects = rects.map((item) => {
      if (item.id === newAttrs.id) {
        return newAttrs;
      }
      return item;
    });
    setRectangles(newRects);
  };
  useEffect(() => {
    let passiveSupported = false;
    const onMouseTouchEnd = (e: MouseEvent) => {
      rectId.current = rectId.current + 1;
      if (mouseDownOnCrop.current) {
        const { pageX, pageY } = e;
        setRectangles((data: any) => {
          return [
            ...data,
            {
              x:
                componentData.current.clientStartX -
                componentData.current.componentX,
              y:
                componentData.current.clientStartY -
                componentData.current.componentY,
              width: pageX - componentData.current.clientStartX,
              height: pageY - componentData.current.clientStartY,
              delete: false,
              id: rectId.current,
            },
          ];
        });
      }
      mouseDownOnCrop.current = false;
    };
    try {
      window.addEventListener(
        'test',
        () => {},
        Object.defineProperty({}, 'passive', {
          get: () => {
            passiveSupported = true;
            return true;
          },
        }),
      );
    } catch (err) {}
    if (componentRef && componentRef.current) {
      const options = passiveSupported ? { passive: false } : false;
      window.addEventListener('mousemove', onMouseTouchMove, options);
      window.addEventListener('mouseup', onMouseTouchEnd, options);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseTouchMove);
      window.removeEventListener('mouseup', onMouseTouchEnd);
    };
  }, [setRectangles]);

  return (
    <Wrap ref={componentRef}>
      <Stage width={width * scale} height={height * scale}>
        <Layer>
          <Image
            onMouseDown={onMouseTouchDown}
            image={image}
            height={height * scale}
            width={width * scale}
            x={0}
            y={0}
          />

          {mouseDownOnCrop && mouseDownOnCrop.current ? (
            <Rect
              x={
                componentData.current.clientStartX -
                componentData.current.componentX
              }
              y={
                componentData.current.clientStartY -
                componentData.current.componentY
              }
              width={pos.x - componentData.current.clientStartX}
              height={pos.y - componentData.current.clientStartY}
              stroke={'rgba(0, 132, 255)'}
              strokeWidth={1}
            />
          ) : null}
          {rectangles.length > 0
            ? rectangles.map((item) => {
                return (
                  <SelectionItem
                    key={item.id}
                    shapeProps={item}
                    isSelected={item.id === selectedId}
                    onSelect={onSelect}
                    onChange={onChange}
                    onMouseTouchDown={onMouseTouchDown}
                  />
                );
              })
            : null}
        </Layer>
      </Stage>
    </Wrap>
  );
};

export default ImageContainer;

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: 357px;
`;
