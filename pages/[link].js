import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomHead } from "@/components/head.js";
import styled from "styled-components";
import Title from "@/components/title";
import Description from "@/components/description";

const ImageList = styled.ul`
  column-count: 2;
  column-gap: 2rem;
  padding: 0;
  list-style: none;
  margin:5rem;
`;

const ImageItem = styled.li`
  width: 100%;
  height: auto;
  break-inside: avoid;
  padding: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
`;

const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LightboxImageContainer = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LightboxImage = styled.img`
  min-height: 75%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;


const LightboxButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 10px;" : "right: 10px;")}
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
`;

const CategoryPage = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImage = (src, index) => {
    setCurrentImage(src);
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + category.attributes.images.data.length) % category.attributes.images.data.length;
    setCurrentImage(category.attributes.images.data[newIndex].attributes.url);
    setCurrentImageIndex(newIndex);
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % category.attributes.images.data.length;
    setCurrentImage(category.attributes.images.data[newIndex].attributes.url);
    setCurrentImageIndex(newIndex);
  };

  const handleKeyDown = (event) => {
    if (isOpen) {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentImageIndex]);

  return (
    <>
      <CustomHead
        title={`WSQ - ${category.attributes.title}`}
        description={`${category.attributes.title} category page`}
        keywords={`${category.attributes.title}, photographer, portfolio`}
      />
      <div>
        <Title text={category.attributes.title}/>
        <Description text={category.attributes.description}/>
        <ImageList>
          {category.attributes.images.data.map((image, index) => (
            <ImageItem key={image.attributes.id}>
              <Image
                src={image.attributes.url}
                alt={image.alt}
                onClick={() => openImage(image.attributes.url, index)}
                />
              </ImageItem>
            ))}
          </ImageList>
        </div>
        {isOpen && (
          <Lightbox onClick={() => setIsOpen(false)}>
            <LightboxButton left onClick={(e) => { e.stopPropagation(); prevImage(); }}>
              &#10094;
            </LightboxButton>
            <LightboxImageContainer onClick={() => setIsOpen(false)}>
              <LightboxImage src={currentImage} onClick={(e) => e.stopPropagation()} />
            </LightboxImageContainer>
            <LightboxButton onClick={(e) => { e.stopPropagation(); nextImage(); }}>
              &#10095;
            </LightboxButton>
          </Lightbox>
        )}

      </>
  );
};      

export async function getStaticPaths() {
  const categories = await axios.get("http://127.0.0.1:1337/api/categories", {params:{ populate: "*" }});
  const paths = categories.data.data.map((category) => ({
    params: { link: category.attributes.link },
  }));

  return { paths, fallback: false };
}


export async function getStaticProps({ params }) {
  const { link } = params;
  const result = await axios.get('http://127.0.0.1:1337/api/categories', {params:{ populate: "*"}});
  const categories = result.data.data; 
  const category = categories.find((p) => p.attributes.link === link);
  console.log(category.attributes.images);
  return {
    props: { category }
  };
}


export default CategoryPage;