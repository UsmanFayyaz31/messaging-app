import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Container,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  TextField,
  Paper,
} from "@mui/material";
import { AccountCircle, Send as SendIcon } from "@mui/icons-material";

interface User {
  id: number;
  name: string;
  profilePicture: string;
}

interface Message {
  id: number;
  senderId: number;
  content: string;
}

const users: User[] = [
  { id: 1, name: "User 1", profilePicture: "user1.jpg" },
  { id: 2, name: "User 2", profilePicture: "user2.jpg" },
  { id: 3, name: "User 3", profilePicture: "user3.jpg" },
  // Add more users as needed
];

const messages: Message[] = [
  { id: 1, senderId: 1, content: "Hello" },
  { id: 2, senderId: 2, content: "Hi" },
  { id: 3, senderId: 1, content: "How are you?" },
  // Add more messages as needed
];

const HomePage: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageInput, setMessageInput] = useState("");

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      // Send the message
      console.log(`Sending message: ${messageInput}`);
      setMessageInput("");
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Messaging App
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
            style={{ marginLeft: 2 }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container>
        <Box display="flex" mt={2}>
          <Box width="25%" pr={2}>
            <Typography variant="h6" component="div">
              Users
            </Typography>
            <List>
              {users.map((user) => (
                <div key={user.id}>
                  <ListItem
                    button
                    selected={selectedUser?.id === user.id}
                    onClick={() => handleUserSelect(user)}
                  >
                    <ListItemAvatar>
                      <Avatar alt={user.name} src={user.profilePicture} />
                    </ListItemAvatar>
                    <ListItemText primary={user.name} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
          <Box flex={1} pl={2}>
            {selectedUser ? (
              <div>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <Avatar
                    alt={selectedUser.name}
                    src={selectedUser.profilePicture}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ marginLeft: 2 }}
                  >
                    {selectedUser.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "grey.300",
                    minHeight: 200,
                    mt: 2,
                    p: 2,
                    overflowY: "auto",
                  }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      style={{
                        display: "flex",
                        flexDirection:
                          message.senderId === selectedUser.id
                            ? "row-reverse"
                            : "row",
                        marginBottom: "10px",
                      }}
                    >
                      <Avatar
                        alt={selectedUser.name}
                        src={selectedUser.profilePicture}
                      />
                      <Paper
                        style={{
                          padding: "10px",
                          display: "inline-block",
                          maxWidth: "70%",
                          alignSelf: "flex-end",
                          backgroundColor:
                            message.senderId === selectedUser.id
                              ? "#dcf8c6"
                              : "#fff",
                          marginLeft:
                            message.senderId === selectedUser.id ? "0" : "10px",
                          marginRight:
                            message.senderId === selectedUser.id ? "10px" : "0",
                        }}
                      >
                        <Typography variant="body1">
                          {message.content}
                        </Typography>
                      </Paper>
                    </div>
                  ))}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <TextField
                    value={messageInput}
                    onChange={handleMessageInputChange}
                    label="Type a message"
                    variant="outlined"
                    fullWidth
                  />
                  <IconButton
                    size="large"
                    color="primary"
                    onClick={handleSendMessage}
                    style={{ marginLeft: 2 }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </div>
            ) : (
              <Typography variant="body1" color="text.secondary">
                Select a user to view messages
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
