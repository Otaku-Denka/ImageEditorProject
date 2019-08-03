import React from 'react';
import styled from 'styled-components';

interface DataZoneProps {
  rectangles: any[];
}

const DataZone: React.FC<DataZoneProps> = ({ rectangles }) => {
  return (
    <DataContainer>
      <pre>
        {JSON.stringify(
          rectangles
            .filter((item) => !item.delete)
            .map((item) => ({
              x: item.x,
              y: item.y,
              width: Math.abs(item.width),
              height: Math.abs(item.height),
            })),
          null,
          2,
        )}
      </pre>
    </DataContainer>
  );
};

const DataContainer = styled.div`
  margin-top: 20px;
  /* display: flex;
  align-items: center; */
  background: #000;
  margin-left: 135px;
  min-height: 703;
  width: 548px;
  color: #fff;
  padding: 20px;
`;

export default DataZone;
