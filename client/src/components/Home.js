import React, { useContext, useEffect, useRef, useState } from "react";
import { FaMenorah, FaSignOutAlt } from "react-icons/fa";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { userAuth } from "./Auth";
import ReactPaginate from 'react-paginate';
import { baseURL } from "../config/BaseURL";

const Home = () => {
  const [data, setData] = useState([]);
  const [limit,setLimit]=useState(4);
  const [pageCount,setPageCount]=useState(1);
  const currentPage=useRef();
  const auth = useContext(userAuth);

  const getCustomer = async () => {
    try {
      const response = await axios.get(`${baseURL}/customer`);
      console.log(response.data.user);   
      setData(response.data.user);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  function getPaginatedUsers(){
    fetch(`${baseURL}/paginatedUsers?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setPageCount(data.pageCount);
        setData(data.result)
        
       
      });

  }

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `${baseURL}/customer/${id}`
      );
      console.log("deleted", response);
      getCustomer();
    } catch (error) {
      console.error("Failed", error);
    }
  };
  function handlePageClick(e) {
    console.log(e);
   currentPage.current=e.selected+1;
    getPaginatedUsers();
   

  }

  function changeLimit(){
    currentPage.current=1;
    getPaginatedUsers();
  }

  function handleLogout(){
    auth.logout();
    
  }

  useEffect(() => {
    currentPage.current=1;
    getPaginatedUsers();
    getCustomer();
  }, []);

  return (
    <>
    <div className="container">
      <nav>
        <ul>
          <li>
            <span className="nav-item">Admin</span>
          </li>
          <li>
            <Link>
              <FaMenorah size={25} />
            </Link>

            <span>Dashboard</span>
          </li>

          <li>
            <Link className="logout" onClick={handleLogout}>
              <FaSignOutAlt size={25} />
              <span className="nav-item">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>

      <section className="main">
        <section className="attendance">
          <div className="attendance-list">
            <h1 style={{ textAlign: "center" }}>Customer Details</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Additional Info</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>

              {data.length > 0 &&
                data.map((item, i) => {
                  return (
                    <tbody key={item._id}>
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>{item.phoneNumber}</td>
                        <td>{item.address}</td>
                        <td>{item.additionalInfo}</td>
                        <td>
                          <button >
                            <Link onClick={() => deleteCustomer(item._id)}>
                            <AiFillDelete color="black" size={25} />
                            </Link>
                          </button>
                        </td>
                        <td>
                          <button>
                          <Link to={`/${item._id}`}>
                            <AiFillEdit color="black" size={25} />
                            </Link>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
            
          </div>
        </section>
        
      </section>

     
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        forcePage={currentPage.current-1}
      />
    </div>
    </>
  );
};

export default Home;
