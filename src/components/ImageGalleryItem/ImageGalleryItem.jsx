import React from 'react';
import styled from 'styled-components';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, openModal }) => {
  return (
    <ImgItem className="gallery-item">
      <img onClick={()=>openModal(largeImageURL)} src={webformatURL} alt="img" id={id} />
    </ImgItem>
  );
};

const ImgItem = styled.li`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);

  img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      transform: scale(1.03);
      cursor: zoom-in;
    }
  }
`;
