import React from "react";
import "./index.css";
import Logo from "../../Assets/logo1.png";
import Pluse from "../../Assets/plusmath.png";
import User from "../../Assets/user.png";
import Trash from "../../Assets/fullTrash.png";
import Next from "../../Assets/nextpage.png";
import Navbar from "../../Components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../Features/authenticatedSlice.js";
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


const Recent_Workplaces = () => {
  let userObject = useSelector((state) => state.authenticatedSlice.value);
  const navigate = useNavigate();
  const [workSpaces, setWorkSpaces] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [createWorkSpaceEnabled, setCreateWorkSpaceEnabled] = useState(false);
  const [newWorkapceName, setNewWorkSpaceName] = useState("");
  const [newWorkSpaceSaved, setNewWorkSpaceSaved] = useState(false);
  const my_work = () => {
    navigate("/my_work");
  };

  useEffect(() => {
    if (Object.keys(userObject).length === 0) {
      navigate("/home");
    } else {
      let user = {
        userId: userObject._id,
      };
      axios
        .post(`http://localhost:4000/ws/getWorkSpaces`, user, {
          headers: {
            Authorization: localStorage.getItem("auth_token"),
          },
        })
        .then((res) => {
          if (res.data.sts === 1) {
            setWorkSpaces(res.data.workspaces);
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
    }
  }, [newWorkSpaceSaved]);

  const handleWorkspaceClick = (wsId) => {
     navigate('/collection_overview', {state: {wsId: wsId}});
  };

  const handleCreateWorkSpace = () => {
    setCreateWorkSpaceEnabled((prevState) => !prevState);
  };

  const handleSaveWorkSpace = () => {
    let wsObj = {
      userId: userObject._id,
      name: newWorkapceName,
    };
    axios
      .post(`http://localhost:4000/ws/create`, wsObj, {
        headers: {
          Authorization: localStorage.getItem("auth_token"),
        },
      })
      .then((res) => {
        if (res.data.sts === 1) {
          setCreateWorkSpaceEnabled(false);
          setNewWorkSpaceName('');
          setSuccess("Workspace saved");
          setNewWorkSpaceSaved((prevState) => !prevState);
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
    <div className="container1">
      <div className="sidebar1">
        <div className="top_section1">
          <div className="logo1">
            <img src={Logo} alt="" />
          </div>

          <div className="title1">
            <h3>IntegraAllay</h3>
          </div>
        </div>

        <div className="addImage">
          <div className="image">
            <a href="#">
              <img src={Pluse} alt="" />
              <span>Add Image</span>
            </a>
          </div>
        </div>

        <div className="functionSection">
          <div className="functionTitle">
            <span>Create new team</span>
          </div>

          <hr className="hr2" />

          <div className="function">
            <img src={Pluse} alt="" />
            <span>Invite friends to collaborate</span>
          </div>

          {/* <div className="function">
            <img src={Pluse} alt="" />
            <span>Functions</span>
          </div>

          <div className="function">
            <img src={Pluse} alt="" />
            <span>Functions</span>
          </div>

          <div className="function">
            <img src={Pluse} alt="" />
            <span>Functions</span>
          </div> */}
        </div>

        <div className="userSection1">
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

      <div className="navbarSide">
        <Navbar />

        <div className="recentSection">
          <div className="recentTitle">My Workspaces</div>

          <div className="recentWork">
            {error && <div style={errorMsg}>{error}</div>}
            {success && <div style={successMsg}>{success}</div>}
            <div className="recent">
              <div className="work">
                {workSpaces.map((ws) => (
                  <div
                    key={ws._id}
                    className="work-text"
                    style={{ cursor: "pointer", marginBottom: '15px'}}
                    onClick={() => {
                      handleWorkspaceClick(ws._id);
                    }}
                  >
                    {ws.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="createSection">
            <div className="createTitle">
              <span>Create New Workspace</span>
            </div>

            <div className="createImg">
              <img src={Pluse} alt="" onClick={handleCreateWorkSpace} />
            </div>
          </div>
          {createWorkSpaceEnabled && (
            <div style={{ marginTop: "10px" }}>
              <div>
                <input
                  type="text"
                  style={{ width: "94%" , height: '40px' , borderRadius: '5px' , border: '1px solid black', outline: 'none', background: 'rgba(32, 38, 80, 1)' , color: 'white' , paddingLeft: '10px' , fontSize: '16px'}}
                  placeholder="Enter workspace Name"
                  value={newWorkapceName}
                  onChange={(e) => setNewWorkSpaceName(e.target.value)}
                />
              </div>

              <button
                type="button"
                style={{ marginTop: "30px", width: "100px", height: "40px", borderRadius: "5px", background: "rgba(32, 38, 80, 1)", color: "white", border: "none", cursor: "pointer", outline: "none", fontSize: "16px" , marginLeft: "1px"}}
                onClick={handleSaveWorkSpace}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recent_Workplaces;
