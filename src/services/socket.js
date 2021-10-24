import { io } from "socket.io-client";
import store from "src/store/configureStore";
import * as actions from "../store/actions/actionTypes";
import emergencySound from "../assets/emergency.mp3";

const apiEndpoint = "http://localhost:5000";

const socket = io(apiEndpoint);

socket.on("connect", () => {
  console.log("connected...");
});

socket.on("new-emergency", (test) => {
  store().dispatch(actions.emegrencyAdded(test));
  window.appHistory.push("/emergencies");
  const sound = new Audio(emergencySound);
  sound.play();
});

export default socket;
