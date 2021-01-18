import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #ade0b5;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${props => (props.gameOver ? '#8c0e0e' : '#ffffff')};
  background: #1b7028;
  font-family: Orion, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
`;