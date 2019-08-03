import React from 'react';
import ReactDOM from 'react-dom';
import 'styled-components';
import defaultTheme from './themes/default';
import 'react-konva';

import App from './App';

type Theme = typeof defaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
interface MyStage {
  width: number;
  height: number;
}

declare module 'react-konva' {
  export interface StageProps extends MyStage {}
}

ReactDOM.render(<App />, document.getElementById('root'));
