import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

import { useLocation, Link, useNavigate } from "react-router-dom";
import { Book } from "../../types/book";
import { BreadcrumbState } from "../../types/breadcrumbState";

export const Table: React.FC<{ data: Book[] }> = ({ data }) => {
  const location = useLocation();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [bookList, setBookList] = useState([{ volumeInfo: { title: "" } }]);
  const navigate = useNavigate();

  const [state, setState] = useState<BreadcrumbState>({
    breadcrumbItems: [],
    selectedItemId: null,
  });

  const handleRowClick = (rowId: number) => {
    const isSelected = selectedRows.includes(rowId);

    if (isSelected) {
      return;
    }
    setSelectedRows([rowId]);
  };

  const fetchData = async (author: Object) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${author}`
      );
      setBookList(response.data.items);
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(state.breadcrumbItems);
  }, [state]);

  useEffect(() => {
    if (location.pathname === "/") {
      setBookList([]);
    }
  }, [location]);

  const handleItemClick = (itemId: String, authors: any) => {
    // Handle the breadcrumb item click if needed
    console.log("Clicked on item ID:", itemId);
    setState((prevState: any) => ({
      ...prevState,
      selectedItemId: itemId,
      breadcrumbItems: authors,
    }));

    // Reset the last URL
    navigate("/");
    setBookList([{ volumeInfo: { title: "" } }]);
  };

  return (
    <div className="md:p-10">
      <table className="bg-blue-100 m-auto">
        <thead className="bg-blue-200">
          <tr>
            <th>Title:</th>
            <th>Author:</th>
            <th>Category:</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              onClick={() => {
                handleRowClick(index);
              }}
              className={selectedRows.includes(index) ? "selected" : ""}
            >
              <th>
                <Link
                  to={item.id}
                  onClick={() =>
                    handleItemClick(item.id, item.volumeInfo.authors)
                  }
                >
                  {item.volumeInfo.title}
                </Link>
              </th>
              <th>
                <Link
                  to={item.id}
                  onClick={() =>
                    handleItemClick(item.id, item.volumeInfo.authors)
                  }
                >
                  {item.volumeInfo.authors}
                </Link>
              </th>
              <th>
                <Link
                  to={item.id}
                  onClick={() =>
                    handleItemClick(item.id, item.volumeInfo.authors)
                  }
                >
                  {item.volumeInfo.categories}
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      {bookList.length > 0 && (
        <table className="m-auto mt-10">
          <thead className="bg-blue-200">
            <tr>
              <th>Books:</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((item, index) => (
              <tr key={index}>
                <th>{item.volumeInfo.title}</th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
