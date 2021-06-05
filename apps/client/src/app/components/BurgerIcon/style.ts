import styled from 'styled-components';

export const Container = styled.div<{ open: boolean }>`
  @media (min-width: 850px) {
    display: none;
  }
  .burger-menu,
  .burger-menu.open {
    display: ${({ open }) => (open ? 'none' : 'block')};
    cursor: pointer;
    position: fixed;
    right: 25px;
    bottom: 17px;
    z-index: 9999;
    background: #fff;
    padding: 8px;
    border-radius: 25px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }
  .bar1,
  .bar2,
  .bar3 {
    width: 20px;
    height: 2px;
    background-color: #333;
    margin: 4px 0;
    transition: 0.4s;
  }
  .burger-menu.open .bar1 {
    -webkit-transform: rotate(-45deg) translate(-4px, 4px);
    transform: rotate(-45deg) translate(-4px, 4px);
  }
  .burger-menu.open .bar2 {
    opacity: 0;
  }
  .burger-menu.open .bar3 {
    -webkit-transform: rotate(45deg) translate(-4px, -4px);
    transform: rotate(45deg) translate(-4px, -4px);
  }
`;