import styled from "styled-components";
import bgImage from "../../../resources/sprites/cubes/CubesBG.jpg";

export const StyledCubesWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledCubes = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 30px;
  margin: 0 auto;
  max-width: 900px;
  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
