import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { DynamicStyledProps } from "./types";

export const ChatBoxHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 2,
});

export const ChatBox = styled(Box)(({ theme }) => ({
  border: "1px solid",
  borderColor: theme.palette.grey[300],
  minHeight: 200,
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  overflowY: "auto",
}));

export const MessageContainer = styled("div")<DynamicStyledProps>(
  ({ theme, message, selectedUser }) => ({
    display: "flex",
    flexDirection: message.sender === selectedUser._id ? "row" : "row-reverse",
    marginBottom: theme.spacing(2),
  })
);

export const MessagePaper = styled(Paper)<DynamicStyledProps>(
  ({ message, selectedUser }) => ({
    padding: "10px",
    display: "inline-block",
    maxWidth: "70%",
    alignSelf: "flex-end",
    backgroundColor: message.sender === selectedUser._id ? "#fff" : "#dcf8c6",
    marginLeft: message.sender === selectedUser._id ? "10px" : "0",
    marginRight: message.sender === selectedUser._id ? "0" : "10px",
  })
);

export const MessageInputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: theme.spacing(2),
}));

export const SelectedUserName = styled(Typography)({
  marginLeft: 6,
});

export const TimeStamp = styled(Typography)<DynamicStyledProps>(
  ({ message, selectedUser }) => ({
    float: message.sender === selectedUser._id ? "left" : "right",
    fontSize: "0.6rem",
    color: "gray",
  })
);

export const SendButton = styled(IconButton)({
  marginLeft: 2,
});

export const StyledAppBar = styled(AppBar)({
  backgroundColor: "#333",
});

export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
});

export const StyledTypography = styled(Typography)({
  flexGrow: 1,
});

export const StyledIconButton = styled(IconButton)({
  marginLeft: 2,
});

export const StyledMenu = styled(Menu)({
  "& .MuiMenu-paper": {
    backgroundColor: "#444",
  },
});

export const StyledMenuItem = styled(MenuItem)({
  color: "#fff",
});
