import { Component } from "react";
import withRouter from "../util/withRouter";
import "./users-chat.scss";
import { connect } from "react-redux";
import sendImg from "../assets/images/send_icon.svg"
import axiosInstance from "../util/axiosConfig";
const io = require('socket.io-client')
// import { io } from "socket.io-client"



// import { useParams } from "react-router-dom";

class UsersChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      msg: "",
      user: {},
      socket: null
    };
    this.msgClass = this.msgClass.bind(this);
    this.onMsgSubmit = this.onMsgSubmit.bind(this)
    this.msgType = this.msgType.bind(this)
    this.removeFromRoom = this.removeFromRoom.bind(this)
    
  }
  msgClass(id) {
    if (this.props.count.user._id == id) return "msg-text owner";
    return "msg-text";
  }

  msgType(e) {
    this.setState({ msg: e.target.value })
  }

  onMsgSubmit() {
    let payload = {
      message: this.state.msg,
      conversation_id: this.props.params.id
    }
    axiosInstance.post('/conversations', payload, { withCredentials: true})
    .then(res => {
      this.state.socket.emit('sendMsgToServer', this.state.msg)
      this.setState({ msg: "" });
      // this.setState({ chat: [...this.state.chat, res.data], msg: "" });
    //   const theElement = document.getElementById('messages');
    //   const scrollToBottom = (node) => {
    //   node.scrollTop = node.scrollHeight;
    // }
    //   setTimeout(() => {
    //     scrollToBottom(theElement);
    //   }, 0)
      
    })
  }

  getUserDetails(){
    axiosInstance
      .get(
        `/users/${this.props.params.user_id}`,
        { withCredentials: true }
      )
      .then((res) => {
        this.setState({ user: res.data });
      });
  }

  removeFromRoom(e){
    console.log('reoving rooom');
    e.preventDefault()
    e.returnValue = ''
  }

  componentDidMount() {
    const theElement = document.getElementById('messages');
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    }
    
    const socket = io(process.env.REACT_APP_API_BASE_URL);
    this.setState({socket: socket})
    socket.on("connect", () => {
      socket.emit('joinUser', { conversation_id: this.props.params.id })
    });
    socket.on("recieve-msg", (msg) => {
      this.setState({ chat: [...this.state.chat, msg], msg: "" });
      setTimeout(() => {
        scrollToBottom(theElement);
      }, 0)
    });
    this.getUserDetails()
    axiosInstance
      .get(
        `/conversations/messages/${this.props.params.id}`,
        { withCredentials: true }
      )
      .then((res) => {
        this.setState({ chat: res.data });
        setTimeout(() => {
          scrollToBottom(theElement);
        }, 0)
      });
  }

  componentWillUnmount(){
    console.log("unmounting ----- ");
    this.state.socket && this.state.socket.emit('userLeaving', this.props.params.id)
  }

  render() {
    return (
      <div>
        <div id="chat" className="chat">
          <div className="conversation">
            <div className="head">
              <div className="person">
                <img src={this.state.user.profile_pic } alt="" />
                <div className="online"></div>
              </div>
              <h3 className="person-name">{ this.state.user.name }</h3>
              <div className="buttons">
                {/* <svg
                  title="Call"
                  className="audio-call icon"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1.25em"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <svg
                  title="Video-call"
                  className="video-call icon"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="1.25em"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                <svg
                  id="button-options"
                  className="button-option icon"
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"6357e468a9208095bd6b1b18
                  stroke-linejoin="round"
                  height="1.25em"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg> */}
              </div>
            </div>

            <div id="messages" className="messages">
              <div className="time">Today</div>
              {this.state.chat.map((chat, index) => (
                <div className={this.msgClass(chat.sender_id)} key={chat._id+""+index}>
                  <span className="text">{chat.message}</span>
                </div>
              ))}
            </div>

            <div className="field">
              {/* <svg
                className="emoji icon"
                stroke="currentColor"
                fill="none"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg> */}
              <input
                id="input-message"
                className="input-message"
                type="text"
                placeholder="Type something..."
                value={this.state.msg}
                onChange={this.msgType}
              />
              <div id="send-text" className="icon send" onClick={()=>this.onMsgSubmit()}>
                <img src={sendImg} alt="" />
              </div>
            </div>
          </div>

          {/* <div id="options" className="options">
            <div className="head">
              <div id="close-options" className="close icon">
                <svg
                  stroke="currentColor"
                  fill="none"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  height="2em"
                  width="2em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </div>
            </div>
    
            <div className="info">
              <div className="person photo">
                <div className="online"></div>
              </div>
              <h2 className="name">Millie</h2>
              <div className="buttons">
                <div className="button">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <p className="title">Audio</p>
                </div>
                <div className="button">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect
                        x="1"
                        y="5"
                        width="15"
                        height="14"
                        rx="2"
                        ry="2"
                      ></rect>
                    </svg>
                  </div>
                  <p className="title">Video</p>
                </div>
                <div className="button">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <p className="title">Profile</p>
                </div>
                <div className="button">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                  </div>
                  <p className="title">Mute</p>
                </div>
              </div>
              <hr />
              <div className="details">
                <label className="search-field">
                  <div className="icon">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <input
                    id="search"
                    className="search"
                    type="text"
                    placeholder="Search"
                  />
                </label>
                <label className="dark-mode">
                  <span className="label">Dark Mode</span>
                  <input id="input-dark" className="input-dark" type="checkbox" />
                  <div className="toggle">
                    <div className="circle"></div>
                  </div>
                </label>
                <div className="theme">
                  <span className="label">Theme</span>
                  <div className="colors">
                    <div id="color-blue" className="color blue"></div>
                    <div id="color-red" className="color red"></div>
                    <div id="color-green" className="color green"></div>
                    <div id="color-purple" className="color purple"></div>
                  </div>
                </div>
                <div className="media">
                  <span className="label">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span>Shared photos</span>
                  </span>
                  <div className="photos">
                    <img className="img" src="https://i.imgur.com/8jqYvFL.jpeg" />
                    <img className="img" src="https://i.imgur.com/jlFgGpe.jpeg" />
                    <img className="img" src="https://i.imgur.com/BfyXuwR.gif" />
                  </div>
                  <span className="view-more">View more</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(withRouter(UsersChat));
