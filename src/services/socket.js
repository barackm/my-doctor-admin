import { io } from "socket.io-client";
import store from "src/store/configureStore";
import * as actions from "../store/actions/actionTypes";
import emergencySound from "../assets/emergency.mp3";

const apiEndpoint = "https://aqueous-gorge-50977.herokuapp.com/";
const appHistory = window.appHistory;
console.log(appHistory);
const socket = io(apiEndpoint);

socket.on("connect", () => {
  console.log("connected...");
});

socket.on("new-emergency", (test) => {
  store().dispatch(actions.emegrencyAdded(test));
  appHistory.push("/emergencies");
  const sound = new Audio(emergencySound);
  sound.play();
});

export default socket;
