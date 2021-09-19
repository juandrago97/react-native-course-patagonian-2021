type Book = {
  id: number;
  title: string;
  author: string;
  publish_date: [
    {
      UK: string;
    },
    {
      US: string;
    },
  ];
  plot_take_place_years: string[];
  book_covers: {
    id: string;
    country: string;
    edition: string;
    artist: string;
    URL: string;
  }[];
  characters: number[];
};

type Character = {
  id: string;
  name: string;
  birth?: string;
  death?: string;
  species: string;
  ancestry?: string;
  gender?: string;
  hair_color?: string;
  eye_color?: string;
  wand?: string;
  patronus?: string;
  house?: string;
  associated_groups: string[];
  books_featured_in: number[];
};
