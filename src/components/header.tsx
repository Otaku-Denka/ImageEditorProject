import React, { memo } from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <BrandIcon />
    </HeaderContainer>
  );
};

export default memo(Header);

const HeaderContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.header_background_color};
  width: 100%;
  height: ${(props) => props.theme.header_height};
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const BrandIcon = styled.span`
  display: inline-block;
  width: ${(props) => props.theme.brand_width};
  height: ${(props) => props.theme.brand_height};
  background: ${(props) => props.theme.brand_background_color};
  border-radius: 50%;
`;
