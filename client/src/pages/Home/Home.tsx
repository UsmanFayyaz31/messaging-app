import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";

import {
  CreateMessagePayload,
  CreateMessageResponse,
  GetFriendsResponse,
  Message,
  MessagesListResponse,
  User,
} from "./types";
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
  TimeStamp,
} from "./HomeStyles";
import {
  BASE_URL,
  GET_FRIENDS,
  LOG_IN,
  MESSAGES,
} from "../../components/services/constants";
import { getRequest, postRequest } from "../../components/services/server";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getMessagesForSelectedUser = (user: User) => {
    getRequest<MessagesListResponse>(`${MESSAGES}${user._id}`)
      .then((messages) => {
        setMessages(messages.data.response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    getMessagesForSelectedUser(user);
  };

  const handleMessageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "" && selectedUser) {
      postRequest<CreateMessagePayload, CreateMessageResponse>(MESSAGES, {
        receiver: selectedUser._id,
        content: messageInput,
      })
        .then((result) => {
          if (result.status === 201) {
            getMessagesForSelectedUser(selectedUser);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });

      setMessageInput("");
    }
  };

  const logOut = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("t");
    navigate(LOG_IN);
  };

  useEffect(() => {
    let user = localStorage.getItem("authUser");

    if (user) {
      let userData = JSON.parse(user);

      setUser(userData);
    }

    getRequest<GetFriendsResponse>(GET_FRIENDS)
      .then((result) => {
        setFriends(result.data.response);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

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
            {user?.profilePicture ? (
              <Avatar
                src={`${BASE_URL}uploads/${user.profilePicture}`}
                alt="profile"
              />
            ) : (
              <Avatar>
                <AccountCircle />
              </Avatar>
            )}
          </StyledIconButton>
          <StyledMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <StyledMenuItem onClick={logOut}>Log Out</StyledMenuItem>
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
              {friends.map((user) => (
                <div key={user._id}>
                  <ListItem
                    button
                    selected={selectedUser?._id === user._id}
                    onClick={() => handleUserSelect(user)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={user.username}
                        src={`${BASE_URL}uploads/${user.profilePicture}`}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={user.username} />
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
                    alt={selectedUser.username}
                    src={`${BASE_URL}uploads/${selectedUser.profilePicture}`}
                  />
                  <SelectedUserName variant="h6">
                    {selectedUser.username}
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
                        alt={selectedUser.username}
                        src={
                          message.sender === selectedUser._id
                            ? `${BASE_URL}uploads/${selectedUser.profilePicture}`
                            : `${BASE_URL}uploads/${user?.profilePicture}`
                        }
                      />
                      <MessagePaper
                        message={message}
                        selectedUser={selectedUser}
                      >
                        <Typography variant="body1">
                          {message.content}
                        </Typography>
                        <TimeStamp
                          variant="caption"
                          message={message}
                          selectedUser={selectedUser}
                        >
                          {new Date(message.timestamp).toLocaleDateString() +
                            " - " +
                            new Date(message.timestamp).toLocaleTimeString()}
                        </TimeStamp>
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
