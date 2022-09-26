const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const {
  enter: enterController,
  leave: leaveController,
  getUsers: getUsersController,
  sendMessage: sendMessageController,
  getMessages: getMessagesController,
} = require("./controllers");
const {
  populateUser: populateUserMiddleware,
  handleError: handleErrorMiddleware,
} = require("./middlewares");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/auth/enter", enterController);
app.post("/api/auth/leave", populateUserMiddleware, leaveController);
app.get("/api/users", populateUserMiddleware, getUsersController);
app.post("/api/messages", populateUserMiddleware, sendMessageController);
app.get("/api/messages", populateUserMiddleware, getMessagesController);
app.use(handleErrorMiddleware);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://daler-developer:2000909k@cluster0.w93fir2.mongodb.net/?retryWrites=true&w=majority",
      { dbName: "task-5" }
    );

    app.listen(process.env.PORT || 4000, () =>
      console.log("listening on post 4000")
    );
  } catch (e) {
    console.log("db error", e);
  }
};

start();
