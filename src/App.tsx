import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from './themes/default';
import CropContainer from './components/cropContainer';
import DataZone from './components/dataZone';
import styled from 'styled-components';

const App: React.FC = () => {
  const [rectangles, setRectangles] = useState<any[]>([]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <CropContainer rectangles={rectangles} setRectangles={setRectangles} />
        <DataZone rectangles={rectangles} />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  display: flex;
`;

export default App;
