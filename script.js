const firebaseConfig = {
  // راح نضيف بيانات Firebase هنا بعد شوي
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const roomInput = document.getElementById("room");
const msgInput = document.getElementById("msg");
const messagesDiv = document.getElementById("messages");

function send() {
  const room = roomInput.value;
  const msg = msgInput.value;

  if (room === "" || msg === "") return;

  database.ref("rooms/" + room).push(msg);
  msgInput.value = "";
}

roomInput.addEventListener("change", () => {
  messagesDiv.innerHTML = "";
  database.ref("rooms/" + roomInput.value)
    .on("child_added", snapshot => {
      const div = document.createElement("div");
      div.textContent = snapshot.val();
      messagesDiv.appendChild(div);
    });
});
