import React from 'react';

interface ClientPos {
  x: number;
  y: number;
}

export const getClientPos = (e: React.MouseEvent): ClientPos => {
  let pageX;
  let pageY;

  ({ pageX, pageY } = e);

  return {
    x: pageX || 0,
    y: pageY || 0,
  };
};

interface CropProp {
  unit?: string;
  aspect: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

const getDocumentOffset = () => {
  const { clientTop = 0, clientLeft = 0 } = document.documentElement || {};
  return { clientTop, clientLeft };
};

const getWindowOffset = () => {
  const { pageYOffset = 0, pageXOffset = 0 } = window;
  return { pageYOffset, pageXOffset };
};

interface GetElementOffsetResult {
  top: number;
  left: number;
}

export const getElementOffset = (el: HTMLElement): GetElementOffsetResult => {
  const rect = el.getBoundingClientRect();
  const doc = getDocumentOffset();
  const win = getWindowOffset();

  const top = rect.top + win.pageYOffset - doc.clientTop;
  const left = rect.left + win.pageXOffset - doc.clientLeft;

  return { top, left };
};
