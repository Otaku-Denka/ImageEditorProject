import React, { useRef, useEffect } from 'react';
import { Rect, Transformer, Image } from 'react-konva';
import { renderToString } from 'react-dom/server';
import { FaTrash } from 'react-icons/fa';
import useImage from '../utils/useImage';

const trashIcon = renderToString(<FaTrash />);
const encodedData = 'data:image/svg+xml;base64,' + window.btoa(trashIcon);

interface ShapeItem {
  delete: boolean;
  height: number;
  id: number;
  width: number;
  x: number;
  y: number;
}

interface SelectionItemProps {
  shapeProps: ShapeItem;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onChange: <ShapeItem>(item: ShapeItem) => void;
  onMouseTouchDown: (e: any) => void;
}

const SelectionItem: React.FC<SelectionItemProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onMouseTouchDown,
}) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [trash] = useImage(encodedData);
  const handleOnSelect = () => {
    onSelect(shapeProps.id);
  };
  const handleOnChange = (e: any) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };
  const handleDelete = (e: any) => {
    onChange({
      ...shapeProps,
      delete: true,
    });
  };
  const handleOnTransfromEnd = (e: any) => {
    let node;
    if (shapeRef && shapeRef.current) {
      node = shapeRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // we will reset it back
      node.scaleX(1);
      node.scaleY(1);
      onChange({
        ...shapeProps,
        x: node.x(),
        y: node.y(),
        width: node.width() * scaleX,
        height: node.height() * scaleY,
      });
    }
  };
  useEffect(() => {
    if (isSelected) {
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={handleOnSelect}
        ref={shapeRef}
        x={shapeProps.x}
        y={shapeProps.y}
        width={shapeProps.width}
        height={shapeProps.height}
        draggable={!shapeProps.delete}
        onDragEnd={handleOnChange}
        onTransformEnd={handleOnTransfromEnd}
        stroke={'rgba(0, 132, 255)'}
        strokeWidth={shapeProps.delete ? 0 : 1}
        fill={shapeProps.delete ? '#fff' : ''}
        onMouseDown={shapeProps.delete ? onMouseTouchDown : () => {}}
      />
      {isSelected && !shapeProps.delete && (
        <Image
          image={trash}
          fill="white"
          width={15}
          height={15}
          x={
            shapeProps.width < 0
              ? shapeProps.x + 10
              : shapeProps.x + shapeProps.width + 10
          }
          y={
            shapeProps.height < 0
              ? shapeProps.y + shapeProps.height
              : shapeProps.y
          }
          onClick={handleDelete}
        />
      )}
      {isSelected && !shapeProps.delete && (
        <Transformer ref={trRef} rotateEnabled={false} />
      )}
    </React.Fragment>
  );
};

SelectionItem.defaultProps = {
  shapeProps: {
    delete: false,
    height: 0,
    id: 0,
    width: 0,
    x: 0,
    y: 0,
  },
  isSelected: false,
  onSelect: () => {},
  onChange: () => {},
  onMouseTouchDown: () => {},
};

export default SelectionItem;
