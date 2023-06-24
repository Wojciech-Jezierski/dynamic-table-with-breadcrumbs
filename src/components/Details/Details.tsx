import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Data } from "../../types/data";

export const Details = () => {
  const [data, setData] = useState([
    {
      id: "",
      volumeInfo: {
        title: "",
        authors: ["steven"],
        pageCount: 0,
      },
    },
  ]);
  const [fetchError, setFetchError] = useState();

  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${id}`
        );
        setData(response.data.items);
        console.log(data);

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
  return (
    <table>
      <thead>
        <tr>
          <th className="mr-10">Title:</th>
          <th>Authors:</th>
          <th>Page count:</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <th>{item.volumeInfo.title}</th>
            <th>{item.volumeInfo.authors}</th>
            <th>{item.volumeInfo.pageCount}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
