import { type Image } from '../types/gallery';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const API_BASE_URL = 'https://api.unsplash.com';
const LOCAL_IMAGES_KEY = 'galleryLocalImages-mui';

const headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
};


export const getImages = async (page = 1, perPage = 30): Promise<Image[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos?page=${page}&per_page=${perPage}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch images');
    return await response.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};


export const searchImages = async (query: string, page = 1, perPage = 30): Promise<Image[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/photos?query=${query}&page=${page}&per_page=${perPage}`, { headers });
    if (!response.ok) throw new Error('Failed to search images');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching images:", error);
    return [];
  }
};


export const getImageById = async (id: string): Promise<Image | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/photos/${id}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch image details');
    return await response.json();
  } catch (error) {
    console.error("Error fetching image by ID:", error);
    return null;
  }
};

export const getLocalImages = (): Image[] => {
  try {
    const data = window.localStorage.getItem(LOCAL_IMAGES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Falha ao carregar imagens locais.", error);
    return [];
  }
};


const saveLocalImages = (images: Image[]): void => {
  try {
    const data = JSON.stringify(images);
    window.localStorage.setItem(LOCAL_IMAGES_KEY, data);
  } catch (error) {
    console.error("Falha ao salvar imagens locais.", error);
  }
};


export const addLocalImage = (url: string, description: string): Image[] => {
  const localImages = getLocalImages();
  
  const newImage: Image = {
    id: `local-${new Date().getTime()}`,
    alt_description: description,
    urls: {
      raw: url, full: url, regular: url, small: url, thumb: url,
    },
    user: { name: 'Você', links: { html: '#' } },
    isLocal: true
  };

  const updatedImages = [newImage, ...localImages];
  saveLocalImages(updatedImages);
  return updatedImages;
};

export const getLocalImageById = (id: string): Image | undefined => {
  const localImages = getLocalImages();
  return localImages.find(image => image.id === id);
};

export const deleteLocalImage = (idToDelete: string): Image[] => {
  const localImages = getLocalImages();
  
  const updatedImages = localImages.filter(image => image.id !== idToDelete);
  
  saveLocalImages(updatedImages);
  return updatedImages;
};