import React from 'react';
import { getAllimages, getImagesByQuery } from '../services/api.jsx';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { ColorRing } from  'react-loader-spinner';
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
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.searchQuery.value;
    this.setState({ searchQuery: searchQuery });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      page = 1;
      try {
        const allImages = await getImagesByQuery(this.state.searchQuery, page);
      this.setState({ searchResult: allImages.hits, loading: true });
      } catch (error) {
        console.log(error)
      } finally {
        this.setState({loading: false });
      }
      
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
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
      modalImageUrl: imgUrl,
    }));
  };

  closeModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.searchResult}
          openModal={this.openModal}
        />
        <Button addMoreImages={this.addMoreImages} />
        {this.state.loading && (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
        {this.state.isModalOpen && (
          <Modal
            modalImageUrl={this.state.modalImageUrl}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
