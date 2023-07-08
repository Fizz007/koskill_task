import React, { useContext, useEffect, useState } from "react";
import { FaMenorah, FaSignOutAlt } from "react-icons/fa";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { userAuth } from "./Auth";

const Home = () => {
  const [data, setData] = useState([]);
  const auth = useContext(userAuth);
  const getCustomer = async () => {
    try {
      const response = await axios.get("http://localhost:4000/customer");
      console.log(response.data.user);
      setData(response.data.user);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/customer/${id}`
      );
      console.log("deleted", response);
      getCustomer();
    } catch (error) {
      console.error("Failed", error);
    }
  };

  function handleLogout(){
    auth.logout();
    
  }

  useEffect(() => {
    getCustomer();
  }, []);

  return (
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
    </div>
  );
};

export default Home;
