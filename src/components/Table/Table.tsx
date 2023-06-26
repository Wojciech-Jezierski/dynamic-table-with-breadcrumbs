import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
import { AiFillHome } from "react-icons/ai";

import { useLocation, useNavigate } from "react-router-dom";
import { Data } from "../../types/data";
import { BreadcrumbState } from "../../types/breadcrumbState";

export const Table: React.FC<{ data: Data[] }> = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [bookList, setBookList] = useState([{ volumeInfo: { title: "" } }]);

  const [state, setState] = useState<BreadcrumbState>({
    selectedItemId: "",
    breadcrumbItems: [],
  });

  const fetchData = async (author: Object) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${author}`
      );
      setBookList(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state.breadcrumbItems && state.breadcrumbItems.length > 0) {
      fetchData(state.breadcrumbItems);
    }
  }, [state.breadcrumbItems]);

  useEffect(() => {
    if (location.pathname === "/") {
      setBookList([]);
      setSelectedRows([]);
    }
  }, [location]);

  const handleRowClick = (rowId: number, item: string) => {
    const isSelected = selectedRows.includes(rowId);
    navigate(`/${item}`);
    if (isSelected) {
      return;
    }
    setSelectedRows([rowId]);
  };

  const handleItemClick = (itemId: string, authors: string[]) => {
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
                handleRowClick(index, item.id);
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
              <th>Books written by the selected author:</th>
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
