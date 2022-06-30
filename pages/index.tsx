import styled from "@emotion/styled";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Strava } from "../src/components/Strava";

const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoLink = styled.a`
  filter: grayscale(100%);
  margin-right: 15px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const Name = styled.h1`
  font-size: 80px;
  letter-spacing: 0.1em;
  color: #ffffff;
  text-shadow: 0 10px 30px rgb(2 11 22 / 50%);
  font-weight: 600;
  text-transform: uppercase;
`;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sam Denty</title>
      </Head>

      <Main>
        <Name>Sam Denty</Name>
        <LogoContainer>
          <LogoLink href="mailto:samddenty@gmail.com" target="_blank">
            <Image src="/logos/email.svg" width={50} height={50} />
          </LogoLink>
          <LogoLink href="https://twitter.com/samddenty" target="_blank">
            <Image src="/logos/twitter.svg" width={50} height={50} />
          </LogoLink>
          <LogoLink href="https://github.com/samdenty" target="_blank">
            <Image src="/logos/github.svg" width={50} height={50} />
          </LogoLink>
          <LogoLink href="https://linkedin.com/in/samdenty" target="_blank">
            <Image src="/logos/linkedin.svg" width={50} height={50} />
          </LogoLink>
          <LogoLink href="https://instagram.com/sam.denty" target="_blank">
            <Image src="/logos/instagram.svg" width={50} height={50} />
          </LogoLink>
        </LogoContainer>
        <Strava />
      </Main>
    </div>
  );
};

export default Home;
