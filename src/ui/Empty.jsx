import styled from "styled-components";

const P = styled.p`
  text-align: center;
`;

function Empty({ resourceName }) {
  return <P>No {resourceName} could be found.</P>;
}

export default Empty;
