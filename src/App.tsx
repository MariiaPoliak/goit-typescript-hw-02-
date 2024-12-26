import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Image } from "./types";
import { Toaster } from "react-hot-toast";
import "./App.css";

const ACCESS_KEY = "T0VycIvJ_66qnoa1i83cVrkkFp_R0MJxLstqnhDCAuM";

interface UnsplashResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    axios
      .get<UnsplashResponse>("https://api.unsplash.com/search/photos", {
        params: { query, page, per_page: 12 },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      })
      .then((response) => {
        setImages((prev) =>
          page === 1
            ? response.data.results
            : [...prev, ...response.data.results]
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const loadMoreImages = () => setPage((prev) => prev + 1);

  return (
    <div className="app">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery
        images={images}
        onClick={(image: Image) => setSelectedImage(image)}
      />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={loadMoreImages} isLoading={isLoading} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <Toaster />
    </div>
  );
};

export default App;
