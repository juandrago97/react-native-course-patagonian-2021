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
