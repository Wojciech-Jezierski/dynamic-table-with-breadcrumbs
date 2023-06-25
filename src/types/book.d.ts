interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string;
    categories: string;
  };
}

export { Book };
