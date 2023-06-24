import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Table.css";

export const Table = () => {
  const [data, setData] = useState<any>([
    { kind: "", id: "", selfLink: "", volumeInfo: { title: "", authors: [] } },
  ]);
  const [fetchError, setFetchError] = useState();
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const handleRowClick = (rowId: any) => {
    // Check if the row is already selected
    const isSelected = selectedRows.includes(rowId);

    if (isSelected) {
      // If the row is already selected, remove it from the selectedRows array
      setSelectedRows(selectedRows.filter((id: any) => id !== rowId));
    } else {
      // If the row is not selected, add it to the selectedRows array
      setSelectedRows([...selectedRows, rowId]);
    }
  };

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
  return (
    <div className="table-content cursor-pointer flex">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr
              key={index}
              onClick={() => handleRowClick(index)}
              className={selectedRows.includes(index) ? "selected" : ""}
            >
              <NavLink to={`/${item.id}`}>
                <th>
                  <input type="checkbox" />
                </th>
                <th>{item.volumeInfo.title}</th>
                <th>{item.volumeInfo.authors}</th>
              </NavLink>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
