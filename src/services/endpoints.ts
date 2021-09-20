import { API_URL } from '../config/envVariables';

export const booksEndpoint = `${API_URL}books/all`;

export const bookDetailEndpoint = (id: number) => `${API_URL}books/${id}`;

export const booksByNameEndpoint = (name: string) => `${API_URL}books?search=${name}`;

export const charactersEndpoint = `${API_URL}characters/all`;

export const characterDetailEndpoint = (id: number) => `${API_URL}characters/${id}`;

export const charactersByNameEndpoint = (name: string) => `${API_URL}characters?search=${name}`;
