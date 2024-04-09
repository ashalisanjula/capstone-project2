import React, { useState, useEffect } from "react";
import "./index.css";
import Sidebar from "../../Components/SideBar";
import Navbar from "../../Components/NavBar";
import Tabs from "../../Components/TabSection";
import { useNavigate } from "react-router-dom";
import VerticalLine from "../../VerticalLine/verticalLine";
import Pluse from "../../Assets/plusmath.png";
import { useLocation } from "react-router-dom";
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


const Request = () => {
  let userObject = useSelector((state) => state.authenticatedSlice.value);
  const location = useLocation();
  const wsId = location.state.wsId;
  const colId = location.state.colId;
  const navigate = useNavigate();
  const [workSpace, setWorkSpace] = useState({});
  const [collection, setCollection] = useState({});
  const [reqMethod, setReqMethod] = useState("get");
  const [reqName, setReqName] = useState("");
  const [reqUrl, setReqUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isReqSaveSuccess, setIsReqSaveSuccess] = useState(false);

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
                return (col._id = colId);
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
  }, [isReqSaveSuccess]);

  const request = () => {
    navigate("/request");
  };

  const response = () => {
    navigate("/response");
  };

  const [bodyList, setBodyList] = useState([{ key: "", value: "" }]);
  const [paramList, setParamList] = useState([{ key: "", value: "" }]);

  // const [ requestName, setRequestName ] = useState('');
  // const [ requestHeader, setRequestHeader ] = useState('Request Headers...');

  const saveRequest = () => {
    setError('');
    setSuccess('');
    let reqObj = {
      userId: userObject._id,
      workspaceId: wsId,
      collectionId: colId,
      name: reqName,
      url: reqUrl,
      reqMethod: reqMethod,
    };

    if (bodyList.length) {
        let bodyObj = {};

        bodyList.map((bo) => {
            if (bo.key.trim() !== '' && bo.value.trim() !== '') {
                bodyObj[bo.key] = bo.value;
            }

        })

        reqObj.reqBody = bodyObj;
    }

    if (paramList.length) {
        let paramObj = {};

        paramList.map((bo) => {
            if (bo.key.trim() !== '' && bo.value.trim() !== '') {
                paramObj[bo.key] = bo.value;
            }
        })

        reqObj.reqParams = paramObj;
    }

    console.log(reqObj);

    axios
      .post(`http://localhost:4000/ws/createRequest`, reqObj, {
        headers: {
          Authorization: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => {
        if (res.data.sts === 1) {
          setSuccess("Request Saved");
        setIsReqSaveSuccess(true);
        console.log(res.data);
        } else {
          setError("There was an error in saving Request");
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

  const handleParamsinputchange = (e, index, isKey) => {
    const list = [...paramList];
    if (isKey) {
      let obj = list[index];
      list[index] = { ...obj, key: e.target.value };
    } else {
      let obj = list[index];
      list[index] = { ...obj, value: e.target.value };
    }
    setParamList(list);
  };

  const handleaddclick = () => {
    setBodyList([...bodyList, { key: "", value: "" }]);
  };

  const handleParamListclick = () => {
    setParamList([...paramList, { key: "", value: "" }]);
  };

  const handleReqMethod = (e) => {
    setReqMethod(e.target.value);
  };

  const handleReqUrl = (e) => {
    setReqUrl(e.target.value);
  };

  const handleRequestName = (e) => {
    setReqName(e.target.value);
  };

  const handleRequestClick = (reqId) => {
    navigate('/response', {state: {wsId: wsId, colId: colId, reqId: reqId}});
  }

  return (
    <div className="container">
      <div className="sidebar3">
        <Sidebar />
      </div>

      <div className="navbarSide">
        <div className="navbar3">
          <Navbar />
        </div>

        <div className="tabSection3">
          <Tabs />
        </div>

        <div className="workplace2">
          <span>Request</span>
        </div>

        <hr className="hr2" />

        <div className="overviewSection2">
          <div className="collectionOverview">
            Workspace Name - {workSpace && workSpace.name}
          </div>
          <div className="collectionOverview">
            Collection Name - {collection && collection.name}
          </div>
        </div>
        <br />
        <table border="1" style={{ tableLayout: "fixed", width: "100%" }}>
          <thead>
            <th>Request Id</th>
            <th>Request Name</th>
            <th>Request Method</th>
            <th>Request URL</th>
            <th>Request Params</th>
            <th>Request Body</th>
            <th width="20%">Request Token</th>
          </thead>
          <tbody>
            {collection &&
              collection.requests &&
              collection.requests.map((req) => (
                <tr key={req._id}>
                  <td style={{ wordWrap: "break-word", cursor: 'pointer'}} onClick={() => handleRequestClick(req._id)}>{req._id}</td>
                  <td style={{ wordWrap: "break-word" }}>{req.name}</td>
                  <td style={{ wordWrap: "break-word" }}>{req.reqMethod}</td>
                  <td style={{ wordWrap: "break-word" }}>{req.url}</td>
                  <td style={{ wordWrap: "break-word" }}>
                    {JSON.stringify(req.reqParams)}
                  </td>
                  <td style={{ wordWrap: "break-word" }}>
                    {JSON.stringify(req.reqBody)}
                  </td>
                  <td style={{ wordWrap: "break-word" }}>{req.token}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {error && <div style={errorMsg}>{error}</div>}
        {success && <div style={successMsg}>{success}</div>}

        <div className="requestBox">
          <div className="box">
            <div className="top-box">
              <div className="input-bar">
                <div className="method">
                  <select
                    id="method-select"
                    onChange={(e) => handleReqMethod(e)}
                    value={reqMethod}
                  >
                    <option className="get" value="get">
                      GET
                    </option>
                    <option className="post" value="post">
                      POST
                    </option>
                    <option className="put" value="put">
                      PUT
                    </option>
                    <option className="delete" value="delete">
                      DELETE
                    </option>
                  </select>
                </div>

                <div className="vl2">
                  <VerticalLine />
                </div>

                <div className="url">
                  <input
                    type="text"
                    placeholder="Enter the URL"
                    value={reqUrl}
                    onChange={(e) => handleReqUrl(e)}
                  />
                </div>
              </div>

              <div className="buttonBox">
                <button onClick={saveRequest}>Save</button>
              </div>
            </div>

            <div className="flex">
              <div className="inputBox">
                <input
                  type="text"
                  placeholder="Request Name"
                  value={reqName}
                  onChange={(e) => handleRequestName(e)}
                />
              </div>

              {/* <div className='inputBox'>
                            <input id='requestHeader' type='text' placeholder='Request Headers' />
                        </div> */}
            </div>

            <div className="input">
              <div className="input-left">
                <div className="input-table">
                  <div className="table-title">
                    <span className="requestBody">Request Body</span>
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

                <div className="input-table1">
                  <div className="table-title">
                    <span className="queryParams">Query Params</span>
                  </div>
                  <table border={1} borderColor="white">
                    <tr className="row1">
                      <th className="blank"></th>
                      <th className="key">Key</th>
                      <th className="value">Value</th>
                    </tr>

                    {paramList.map((x, i) => {
                      return (
                        <tr className="row2">
                          <th className="blank">
                            <img
                              src={Pluse}
                              alt=""
                              onClick={handleParamListclick}
                            />
                          </th>

                          <td className="key">
                            <input
                              type="text"
                              onChange={(e) =>
                                handleParamsinputchange(e, i, true)
                              }
                            />
                          </td>

                          <td className="value">
                            <input
                              type="text"
                              onChange={(e) =>
                                handleParamsinputchange(e, i, false)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>

              <div className="input-line">
                <VerticalLine />
              </div>

              <div className="input-right">
                <div className="right-title">
                  <span className="request">Request</span>
                </div>

                <hr className="request-hr" />

                {/* <div className='request-content'>
                                {requestName=== '' ? 
                                <p>No responses</p> :
                                <p>Request Name :<br /><br />
                                   Request Headers :</p> 
                                }
                            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
