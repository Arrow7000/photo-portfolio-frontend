import {
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthCtx } from "../../components/AuthProvider";
import { serverUrl } from "../../components/config";

export default function LoginPage() {
  const router = useRouter();

  const goToAdminHome = () => router.push("/admin");

  const { token, setToken } = useAuthCtx();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    if (token) {
      goToAdminHome();
    }
  }, [token]);

  const login = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const tokenResult = await axios.post<string>(
        serverUrl + "/auth/login",
        formData
      );

      setToken(tokenResult.data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Grid container direction="column" justify="center">
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <Button
          onClick={login}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Log in
        </Button>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={"" + error}
        />
      </Grid>
    </Container>
  );
}
