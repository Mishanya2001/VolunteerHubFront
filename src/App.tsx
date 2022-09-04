import { createTheme } from "@mui/material";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import VHBar from "./Components/VHBar";
import AccountPostsMessages from "./pages/AccountMessagesPage";
import AccountPostsPage from "./pages/AccountPostsPage";
import AccountProfilePage from "./pages/AccountProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import EditProfilePage from "./pages/EditProfilePage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import SendPostPage from "./pages/SendPostPage";
import TestPage from "./pages/TestPage";

//Need this for proper work with TypeScript
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ADB5",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
      contrastText: "#00ADB5",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "300",
          fontSize: "18px",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: "rgba(243, 189, 149, 0.72)!important",
          color: "a18570",
        },
      },
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/account/posts" element={<AccountPostsPage />} />
          <Route path="/account/profile" element={<AccountProfilePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/account/edit" element={<EditProfilePage />} />
          <Route path="/send-post" element={<SendPostPage />} />
          <Route path="/account/messages" element={<AccountPostsMessages />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
