import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
import { AiFillHome } from "react-icons/ai";

import { useLocation, useNavigate } from "react-router-dom";
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

  const handleRowClick = (rowId: number, item: any) => {
    const isSelected = selectedRows.includes(rowId);
    navigate(`/${item.id}`);
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
      setSelectedRows([]);
    }
  }, [location]);

  const handleItemClick = (itemId: any, authors: any) => {
    // Handle the breadcrumb item click if needed
    console.log("Clicked on item ID:", itemId);
    setState({
      selectedItemId: itemId,
      breadcrumbItems: authors,
    });

    setBookList([{ volumeInfo: { title: "" } }]);
  };

  const resetUrl = () => {
    navigate("/");
  };

  return (
    <div className="md:p-10">
      <div className="flex justify-center items-center">
        <button
          onClick={resetUrl}
          className="bg-blue-400 w-24 h-10 text-xl text-white rounded-md flex justify-center items-center"
        >
          Home <AiFillHome className="ml-1" />
        </button>
      </div>
      <table className="bg-blue-100 m-auto cursor-pointer mt-10">
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
                resetUrl();
                handleRowClick(index, item);
                handleItemClick(item.id, item.volumeInfo.authors);
              }}
              className={selectedRows.includes(index) ? "selected" : undefined}
            >
              <th>{item.volumeInfo.title}</th>
              <th>{item.volumeInfo.authors}</th>
              <th>{item.volumeInfo.categories}</th>
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
