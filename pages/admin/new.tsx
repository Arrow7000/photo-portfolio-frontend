import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { apiUrl } from "../../components/config";
import { stringToSlug } from "../../components/helpers";
import { NextLink } from "../../components/Links";
import { PhotoPreview } from "../../components/PhotoPreview";

export default function NewPhotoAdmin() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [newImage, setNewImage] = useState<File | null>(null);

  // Ideally this shouldn't be its own state but derived from newImage
  const [newImageDataUri, setNewImageDataUri] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [specifiedSlug, setSpecifiedSlug] = useState("");

  const slug = stringToSlug(specifiedSlug.length > 0 ? specifiedSlug : title);

  const setStrValue = (setter: (v: string) => void) => (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setter(e.target.value);

  const changeImage = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];

      setNewImage(file);
    }
  };

  useEffect(() => {
    if (newImage) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        ev.target && setNewImageDataUri(ev.target.result as string);

      reader.readAsDataURL(newImage);
    }
  }, [newImage]);

  const adminPath = "/admin";
  const goToAdmin = () => router.push(adminPath);

  const cancelChanges = () => {
    goToAdmin();
  };

  const submitChanges = async () => {
    if (newImage) {
      setIsLoading(true);

      const form = new FormData();
      form.append("image", newImage);
      form.append("title", title);
      form.append("slug", slug);
      form.append("description", description);

      try {
        await axios.post<FullPhoto>(apiUrl + `/upload`, form);
        goToAdmin();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onDrop = useCallback((files: File[]) => {
    const file = files[0];

    if (file) {
      setNewImage(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <NextLink href={adminPath}>
            <IconButton edge="start">
              <ArrowBack style={{ color: "white" }} />
            </IconButton>
          </NextLink>
          <Typography>Create New Photo</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container>
        <PhotoPreview src={newImageDataUri ?? undefined} {...getRootProps()} />

        <Grid container direction="column" justify="flex-start">
          <Button variant="contained" component="label">
            {isDragActive ? "Drop to upload" : "Add/change image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => changeImage(e.target.files)}
              {...getInputProps()}
            />
          </Button>
          <TextField
            label="Title"
            onChange={setStrValue(setTitle)}
            value={title}
            disabled={isLoading}
          />
          <TextField
            label="Slug"
            onChange={setStrValue(setSpecifiedSlug)}
            placeholder={slug}
            value={stringToSlug(specifiedSlug)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <code>/photo/</code>
                </InputAdornment>
              ),
            }}
            disabled={isLoading}
          />
          <TextField
            label="Description"
            onChange={setStrValue(setDescription)}
            value={description}
            multiline
            disabled={isLoading}
          />
          <Grid container justify="space-between">
            <Box>
              <Button
                onClick={submitChanges}
                disabled={isLoading || !newImage || !slug}
                color="primary"
                variant="contained"
              >
                Create
              </Button>
              <Button
                onClick={cancelChanges}
                disabled={isLoading || !newImage || !slug}
                variant="text"
              >
                Cancel
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
