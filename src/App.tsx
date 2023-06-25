import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";

import { Table } from "./components/Table/Table";

const App: React.FC = () => {
  const [data, setData] = useState<any>([
    { id: "", volumeInfo: { title: "", authors: [] } },
  ]);
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=isbn"
        );
        setData(response.data.items);
        console.log(response.data.items);

        // setData(apiResponse);
      } catch (error: any) {
        setFetchError(error.message);
      }
    };

    fetchData();
  }, []);

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  return <Table data={data} />;
};

export default App;
