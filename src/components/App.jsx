import React from 'react';
import { getAllimages, getImagesByQuery } from '../services/api.jsx';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
let page = 1;

export class App extends React.Component {
  state = {
    searchQuery: '',
    searchResult: [],
    isModalOpen: false,
    loading: false,
    modalImageUrl: '',
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true, error: null });
      const allImages = await getAllimages();
      this.setState({ searchResult: allImages.hits });
    } catch (error) {}
  }

  onSubmit = event => {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.searchQuery.value;
    this.setState({ searchQuery: searchQuery });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      page = 1;
      const allImages = await getImagesByQuery(this.state.searchQuery, page);
      this.setState({ searchResult: allImages.hits });
    }
  }

  addMoreImages = async () => {
    page += 1;
    try {
      const allImages = await getImagesByQuery(this.state.searchQuery, page);
      this.setState(prevState => ({
        searchResult: [...prevState.searchResult, ...allImages.hits],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  openModal = imgUrl => {
    this.setState(prevState => ({isModalOpen: !prevState.isModalOpen,
      modalImageUrl: imgUrl}));
  };

  closeModal = () => {
    this.setState(prevState => ({isModalOpen: !prevState.isModalOpen}))
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.searchResult}
          openModal={this.openModal}
        />
        <Button addMoreImages={this.addMoreImages} />
        {this.state.isModalOpen && <Modal modalImageUrl={this.state.modalImageUrl} closeModal={this.closeModal}/>}
      </div>
    );
  }
}
