import React from "react";
import "./index.css";
import Navbar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo1.png";
import Pluse from "../../Assets/plusmath.png";
import Next from "../../Assets/nextpage.png";
import Search from "../../Assets/search.png";
import User from "../../Assets/user.png";
// import Popup from "../../Components/PopUp/popup";
import PopupInvite from '../../Components/PopUpInvite/popupInvite';
import { useState, useEffect } from "react";
import VreticalLine from "../../VerticalLine/verticalLine";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Tabs from '../../Components/TabSection';

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

const Collection_Overview = () => {
  let userObject = useSelector((state) => state.authenticatedSlice.value);
  // const [buttonPopup, setButtonPopup] = useState(false);
  const location = useLocation();
  const wsId = location.state.wsId;
  const [workspace, setWorkSpace] = useState({});
  const [createCollectionEnabled, setCreateCollectionEnabled] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionSaved, setNewCollectionSaved] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [buttonInvite, setButtonInvite] = useState(false);

  const navigate = useNavigate();

  const workspaces = () => {
    navigate('/workspace');
}

  const collection_overview = () => {
    navigate("/collection_overview");
  };

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
  }, [newCollectionSaved]);

  const request = () => {
    navigate("/request",{state: {wsId: wsId}});
  };

  const response = () => {
    navigate("/response", {state: {wsId: wsId}});
  };

  const handleClickCollection = (colId) => {
    navigate('/request', {state: {wsId: wsId, colId: colId}})
  };

  const handleCreateCollection = () => {
     setCreateCollectionEnabled((prevState) => !prevState);
  };

  const handleSubmitCollection = () => {
    let colObj = {
        userId: userObject._id,
        name: newCollectionName,
        workspaceId: wsId
      };
      axios
        .post(`http://localhost:4000/ws/createCollection`, colObj, {
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        })
        .then((res) => {
          if (res.data.sts === 1) {
            setCreateCollectionEnabled(false);
            setNewCollectionName('');
            setSuccess("Workspace saved");
            setNewCollectionSaved((prevState) => !prevState);
          } else {
            setError("There was an error in saving workspace");
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
      <div className="sidebar2">
        <div className="sidebar">
          <div className="top_section">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>

            <div className="title">
              <h3>IntegraAllay</h3>
            </div>
          </div>

          <div className="workplace1">
            <div className="work">
              <h3>Workplaces</h3>
            </div>

            <div className="pluse2">
              <img src={Pluse} alt="" onClick={workspaces} />
            </div>
          </div>

          <hr className="hr" />

          <div className="collectionSection">
            <div className="collectionRight">
              <div className="top">
                {/* <div className="pluse1">
                  <img
                    src={Pluse}
                    alt=""
                    onClick={() => setButtonPopup(true)}
                  />
                </div> */}

                <div className="search">
                  <img src={Search} alt="" />
                </div>
              </div>

              <div className="right">
                <div className="content">
                  

                  <div className="name">
                    {workspace &&
                      workspace.collections &&
                      workspace.collections.length &&
                      workspace.collections.map((col) => (
                    <div
                      onClick={() => {
                        handleClickCollection(col._id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                    <div className="icon1">
                      <img src={Next} alt="" />
                      <div className="colName">
                        {col.name}
                      </div>
                    </div>
                  
                  </div>
              ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="userSection">
            <div className="user">
              <div className="userImage">
                <img src={User} alt="" />
              </div>

              <div className="userName">
                <h3>Hashara Nethmi</h3>
                <span>hasharanethmi2020@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="navbarSide">
        <div className="navbar2">
          <Navbar />
        </div>

        <div className="tabSection">
          <Tabs />
        </div>

        <div className="myWork">
          <span>{workspace.name}</span>
        </div>

        <hr className="hr1" />

        <div className="overviewSection1">
          <div className="collectionOverview">
            <button onClick={collection_overview}>
              <div className="active">
                <span>Collections</span>
              </div>
            </button>
          </div>

          <div className="collectionOverview">
            <button onClick={request}>
              <span>Request</span>
            </button>
          </div>

          <div className="collectionOverview">
            <button onClick={response}>
              <span>Response</span>
            </button>
          </div>
        </div>

        <div className="overviewSection1">
          <div className="collectionOverview">
            {workspace &&
              workspace.collections &&
              workspace.collections.length &&
              workspace.collections.map((col) => (
                <div
                  onClick={() => {
                    handleClickCollection(col._id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {col.name}
                </div>
              ))}
          </div>
                  
          <div className="collectionOverviewR">
            {workspace &&
              workspace.collections &&
              workspace.collections.length &&
              workspace.collections.map((col) => (
                <div>{col.requests.length}</div>
              ))}
          </div>

          <div className="collectionOverview">
            {workspace &&
              workspace.collections &&
              workspace.collections.length &&
              workspace.collections.map((col) => (
                <div>{col.responses.length}</div>
              ))}
          </div>
        </div>

        <div className="body-content">
        {error && <div style={errorMsg}>{error}</div>}
        {success && <div style={successMsg}>{success}</div>}
          <div className="left-content">
            <div className="createSection">
              <div className="createTitle">
                <span>Create New Collection</span>
              </div>

              <div className="createImg">
                <img src={Pluse} alt="" onClick={handleCreateCollection} style={{width: "30px"}} />
              </div>
            </div>
            {createCollectionEnabled && (
              <div style={{ marginTop: "10px" }}>
                <div>
                  <input
                    type="text"
                    placeholder="Enter workspace Name"
                    style={{ width: "97%" , background: "rgba(32, 38, 80, 1)" , height: '40px' , borderRadius: '5px' , border: 'none', outline: 'none' , color: 'white' , paddingLeft: '10px' , fontSize: '16px',  placeholder: {color: 'white'}}}
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  style={{ marginTop: "30px", width: "100px", height: "40px", borderRadius: "5px", background: "rgba(32, 38, 80, 1)", color: 'white' , border: "none", cursor: "pointer", outline: "none", fontSize: "16px" , marginLeft: "1px", alignItems: 'center', paddingLeft: '30px'}}
                  onClick={handleSubmitCollection}
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* <Popup triger={buttonPopup} setTriger={setButtonPopup} /> */}

          <PopupInvite triger={buttonInvite} setTriger={setButtonInvite} />

          <div className="right-content">
            <div className="vertical">
              <VreticalLine />
            </div>

            <div className="about">
              <h1>About</h1>
              <input
                className="description"
                type="text"
                placeholder="Add a summary about this workspace."
              ></input>
              <div className="contributor">
                <h1>Contributors</h1>
                <span>No contibutors to show</span>
              </div>
              <button>
                <img src={Pluse} alt=" " />
                <div className="invite" onClick={() => setButtonInvite(true)}>Invite</div>
              </button>
            </div>
          </div>
        </div>

        {/* <div className='collectionBox'>
                <div className='box'>

                    <div className='inputBox'>
                        <input type='text' placeholder='Collection ID' />
                    </div>

                    <div className='inputBox'>
                        <input type='text' placeholder='Collection Name' />
                    </div>

                    <div className='btn'>
                        <button>Create</button>
                    </div>

                </div>
            </div> */}
      </div>
    </div>
  );
};

export default Collection_Overview;
