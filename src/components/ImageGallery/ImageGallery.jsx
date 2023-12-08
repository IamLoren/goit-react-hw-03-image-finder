import React from 'react';
import styled from 'styled-components';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';

export const ImageGallery = ({images, openModal}) => {
  return (
    <ImageList className="gallery">
        {images.map(({id, webformatURL, largeImageURL}) => {
            return (
                <ImageGalleryItem key={id} webformatURL={webformatURL} largeImageURL={largeImageURL} openModal={openModal}/>
            )
        })}
</ImageList>
  )
}

const ImageList = styled.ul`
display: grid;
max-width: calc(100vw - 48px);
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
grid-gap: 16px;
margin-top: 0;
margin-bottom: 0;
padding: 20px 0;
list-style: none;
margin-left: auto;
margin-right: auto;
`
