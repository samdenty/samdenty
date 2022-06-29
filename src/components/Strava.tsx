import styled from "@emotion/styled";
import { useState } from "react";
import { Miles } from "./Miles";

const StyledStrava = styled.div<{ loaded: boolean }>`
  padding: 20px;
  padding-left: 0;
  border: ${({ loaded }) => (loaded ? `5px solid #fb5200` : "none")};
  background: ${({ loaded }) => (loaded ? `#2a1c15` : `transparent`)};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

const Follow = styled.a`
  margin-top: -50px;
  display: flex;
  background: #fb5200;
  color: #fff;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 15px;
  line-height: 30px;
  margin-bottom: 20px;
  width: max-content;

  img {
    height: 30px;
    border-radius: 5px;
    margin-right: 10px;
  }
`;

export function Strava() {
  const [loaded, setLoaded] = useState(false);

  return (
    <StyledStrava loaded={loaded}>
      <Follow href={`https://www.strava.com/athletes/samdenty`} target="_blank">
        <img src="https://graph.facebook.com/2662472400671491/picture?height=256&width=256" />
        Follow me on&nbsp;<b>Strava</b>
      </Follow>
      <Miles width={500} height={200} onLoad={() => setLoaded(true)} />
    </StyledStrava>
  );
}
