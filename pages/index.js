
import React from "react";
import axios from "axios";
import { CustomHead } from "@/components/head.js";
import styled from "styled-components";
import Link from "next/link";

const CategoryList = styled.ul`
  column-count: 3;
  column-gap: 2rem;
  padding: 5rem 5rem 1rem 5rem;
  list-style: none;
  font-family: 'Times New Roman', Times, serif;
`;

const CategoryItem = styled.li`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  break-inside: avoid;
`;

const CategoryImageContainer = styled.div`
  position: relative;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  cursor: pointer;

  &:hover .overlay {
    opacity: 0.5;
  }

  &:hover .description {
    opacity: 1;
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid #545454;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: grey;
  opacity: 0;
  transition: opacity 0.3s;
`;

const Description = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  color: white;
  text-align: center;
  transition: opacity 0.3s;
`;

const CategoryTitle = styled.h3`
  margin-top: 1rem;
  font-size: 2rem;
  color: #2E2E2E;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  font-family: 'Times New Roman', Times, serif;
  color: black;
  display: inline-block;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;  
`;

const Home = ({ categories }) => {
  return (
    <>
      <CustomHead
        title="WSQ - Home"
        description="Welcome to my homepage"
        keywords="home, photographer, portfolio, adelaide, australia, willunga, port willunga"
      />
      <CategoryList>
        {categories.data.map((category) => (
          <CategoryItem key={category.id}>
            <CategoryLink href={`${category.attributes.link}`}>
              <CategoryImageContainer>
                <CategoryImage src={category.attributes.preview.data.attributes.url} alt={category.attributes.title} />
                <Overlay className="overlay" />
                <Description className="description">{category.attributes.description}</Description>
              </CategoryImageContainer>
              <CategoryTitle>{category.attributes.title}</CategoryTitle>
            </CategoryLink>
          </CategoryItem>
        ))}
      </CategoryList>
    </>
  );
};

export async function getStaticProps() {
  try {
    // fetch all categories
    const categories = await axios.get("http://127.0.0.1:1337/api/categories", { params: { populate: "*" } });
    const data = categories.data;

    return {
      props: {
        categories: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default Home;
