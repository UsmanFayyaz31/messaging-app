import React, { useState } from "react";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";
import { AccountCircle, Send as SendIcon } from "@mui/icons-material";

import { Message, User } from "./types";
import {
  StyledAppBar,
  StyledToolbar,
  StyledTypography,
  StyledIconButton,
  StyledMenu,
  StyledMenuItem,
  ChatBoxHeader,
  SelectedUserName,
  ChatBox,
  MessageContainer,
  MessagePaper,
  MessageInputContainer,
  SendButton,
} from "./HomeStyles";

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
      <StyledAppBar position="static">
        <StyledToolbar>
          <StyledTypography variant="h6">Messaging App</StyledTypography>
          <StyledIconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </StyledIconButton>
          <StyledMenu
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
            <StyledMenuItem onClick={handleMenuClose}>
              Account Settings
            </StyledMenuItem>
          </StyledMenu>
        </StyledToolbar>
      </StyledAppBar>

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
                <ChatBoxHeader>
                  <Avatar
                    alt={selectedUser.name}
                    src={selectedUser.profilePicture}
                  />
                  <SelectedUserName variant="h6">
                    {selectedUser.name}
                  </SelectedUserName>
                </ChatBoxHeader>
                <ChatBox>
                  {messages.map((message) => (
                    <MessageContainer
                      key={message.id}
                      message={message}
                      selectedUser={selectedUser}
                    >
                      <Avatar
                        alt={selectedUser.name}
                        src={selectedUser.profilePicture}
                      />
                      <MessagePaper
                        message={message}
                        selectedUser={selectedUser}
                      >
                        <Typography variant="body1">
                          {message.content}
                        </Typography>
                      </MessagePaper>
                    </MessageContainer>
                  ))}
                </ChatBox>

                <MessageInputContainer>
                  <TextField
                    value={messageInput}
                    onChange={handleMessageInputChange}
                    label="Type a message"
                    variant="outlined"
                    fullWidth
                  />
                  <SendButton
                    size="large"
                    color="primary"
                    onClick={handleSendMessage}
                  >
                    <SendIcon />
                  </SendButton>
                </MessageInputContainer>
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
