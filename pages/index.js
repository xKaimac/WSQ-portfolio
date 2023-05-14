import React from "react";
import axios from "axios";
import { CustomHead } from "@/components/head.js";
import styled from "styled-components";
import Link from "next/link";

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20vw;
  padding: 2rem;
  height: calc(100% - 4rem);
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 30vw;
  padding-right: 2rem;
`;

const DescriptionContainer = styled.div`
  flex: 2;
  padding-left: 2rem;
`;

const AboutMeImage = styled.img`
  width: 100%;
  height: auto;
`;

const Home = ({ aboutme }) => {
  return (
    <>
      <CustomHead
        title="WSQ - Home"
        description="Welcome to my homepage"
        keywords="home, photographer, portfolio, adelaide, australia, willunga, port willunga"
      />
      <ContentContainer>
        {aboutme.data.map((about) => (
          <React.Fragment key={about.id}>
            <ImageContainer>
              <AboutMeImage src={about.attributes.image.data[0].attributes.url} />
            </ImageContainer>
            <DescriptionContainer>
              <h2>{about.attributes.title}</h2>
              <p>{about.attributes.description}</p>
            </DescriptionContainer>
          </React.Fragment>
        ))}
      </ContentContainer>
    </>
  );
};

export async function getStaticProps() {
  try {
    const about = await axios.get("http://wsq-cms.herokuapp.com/api/about-mes", { params: { populate: "*" } });
    const data = about.data;
    console.log(data.data[0].attributes.image.data[0].attributes.url);
    return {
      props: {
        aboutme: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default Home;
