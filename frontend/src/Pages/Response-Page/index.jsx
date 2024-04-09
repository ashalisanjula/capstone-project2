import React from "react";
import Sidebar from "../../Components/SideBar";
import Navbar from "../../Components/NavBar";
import Tabs from "../../Components/TabSection";
import "./index.css";
import { useNavigate, useLocation } from "react-router-dom";
import Pluse from "../../Assets/plusmath.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const errorMsg = {
  paddingTop: "5px",
  color: "red",
  fontWeight: "bold",
};

const successMsg = {
  paddingTop: "5px",
  color: "green",
  fontWeight: "bold",
};

const Response = () => {
  let userObject = useSelector((state) => state.authenticatedSlice.value);
  const navigate = useNavigate();
  const location = useLocation();
  const wsId = location.state.wsId;
  const colId = location.state.colId;
  const reqId = location.state.reqId;

  const [workSpace, setWorkSpace] = useState({});
  const [collection, setCollection] = useState({});
  const [requestId, setRequestId] = useState(reqId);
  const [resObj, setResObj] = useState("");
  const [isResponseSaveSuccess, setIsResponseSaveSuccess] = useState(false);
  const [resStatus, setResStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [bodyList, setBodyList] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    let data = {
      userId: userObject._id,
      wsId: wsId,
    };

    axios
      .post(`http://localhost:4000/ws/getWorkSpaceById`, data, {
        headers: {
          Authorization: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => {
        if (res.data.sts === 1) {
          if (res.data.workspaces && res.data.workspaces.length) {
            setWorkSpace(res.data.workspaces[0]);
            setCollection(
              res.data.workspaces[0].collections.find((col) => {
                return col._id === colId;
              })
            );
          }
        } else {
        }
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.sts === -1
        ) {
        } else {
        }
      });
  }, [isResponseSaveSuccess]);

  useEffect(() => {
    if (collection && collection.responses) {
      setResObj(
        collection.responses.find((res) => {
          return res.requestId === reqId;
        })
      );
    }
  }, [collection, isResponseSaveSuccess]);

  const response = () => {
    navigate("/response", { state: { wsId: wsId } });
  };

  const handleaddclick = () => {
    setBodyList([...bodyList, { key: "", value: "" }]);
  };

  const handleinputchange = (e, index, isKey) => {
    const list = [...bodyList];
    if (isKey) {
      let obj = list[index];
      list[index] = { ...obj, key: e.target.value };
    } else {
      let obj = list[index];
      list[index] = { ...obj, value: e.target.value };
    }

    setBodyList(list);
  };

  const handleSaveResponse = () => {
    setError('');
    setSuccess('');
    let resObj = {
      userId: userObject._id,
      workspaceId: wsId,
      collectionId: colId,
      requestId: reqId,
      status: resStatus,
    };

    if (bodyList.length) {
      let bodyObj = {};

      bodyList.map((bo) => {
        if (bo.key.trim() !== "" && bo.value.trim() !== "") {
          bodyObj[bo.key] = bo.value;
        }
      });

      resObj.resBody = bodyObj;
    }

    axios
      .post(`http://localhost:4000/ws/createResponse`, resObj, {
        headers: {
          Authorization: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => {
        if (res.data.sts === 1) {
          setSuccess("Response Saved");
          setIsResponseSaveSuccess(true);
            console.log(res.data);
        } else {
          setError("There was an error in saving Response");
        }
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.sts === -1
        ) {
          setError(err.res.data.error);
        } else {
          setError("Unexpected Error");
        }
      });
  };

  return (
    <div className="container">
      <div className="sidebar3">
        <Sidebar />
      </div>

      <div className="navbarSide">
        <div className="navbar3">
          <Navbar />
        </div>

        <div className="tabSection">
          <Tabs />
        </div>

        <div className="myWork3">
          <span>Response</span>
        </div>

        <hr className="hr3" />

        <div className="overviewSection3">
          <div className="overviewSection2">
            <div className="collectionOverview">
              Workspace Name - {workSpace && workSpace.name}
            </div>
            <div className="collectionOverview">
              Collection Name - {collection && collection.name}
            </div>
            <div className="collectionOverview">
              Request ID - {reqId && reqId}
            </div>
          </div>
        </div>

        {resObj && (
          <table border="1" style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <th>Response Id</th>
              <th>Response Status</th>
              <th>Response Body</th>
            </thead>
            <tbody>
              <tr>
                <td style={{ wordWrap: "break-word", cursor: "pointer" }}>
                  {resObj._id}
                </td>
                <td style={{ wordWrap: "break-word" }}>{resObj.status}</td>
                <td style={{ wordWrap: "break-word" }}>
                  {JSON.stringify(resObj.resBody)}
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {error && <div style={errorMsg}>{error}</div>}
        {success && <div style={successMsg}>{success}</div>}
        {!resObj && (
          <div className="collectionBox2">
            <div className="box">
              {/* <div className='inputBox'>
                        <input type='text' placeholder='Response Object' />
                    </div>

                    <div className='inputBox'>
                        <input type='text' placeholder='Response Headers' />
                    </div> */}

              <div className="input-table1">
                <div className="table-title">
                  <span className="queryParams">Response Object</span>
                </div>
                <table border={1} borderColor="white">
                  <tr className="row1">
                    <th className="blank"></th>
                    <th className="key">Key</th>
                    <th className="value">Value</th>
                  </tr>

                  {bodyList.map((x, i) => {
                    return (
                      <tr className="row2">
                        <th className="blank">
                          <img src={Pluse} alt="" onClick={handleaddclick} />
                        </th>

                        <td className="key">
                          <input
                            type="text"
                            onChange={(e) => handleinputchange(e, i, true)}
                          />
                        </td>

                        <td className="value">
                          <input
                            type="text"
                            onChange={(e) => handleinputchange(e, i, false)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>

              {/* <div className="input-table1">
              <div className="table-title">
                <span className="queryParams">Response Header</span>
              </div>
              <table border={1} borderColor="white">
                <tr className="row1">
                  <th className="blank"></th>
                  <th className="key">Key</th>
                  <th className="value">Value</th>
                </tr>

                <tr className="row2">
                  <th className="blank">
                    <img src={Pluse} alt="" />
                  </th>

                  <td className="key">
                    <input type="text" />
                  </td>

                  <td className="value">
                    <input type="text" />
                  </td>
                </tr>
              </table>
            </div> */}

              <div className="inputBox2">
                <input
                  type="text"
                  placeholder="Response Status"
                  value={resStatus}
                  onChange={(e) => setResStatus(e.target.value)}
                />
              </div>

              <div className="invite-btn">
                <button onClick={handleSaveResponse}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Response;
