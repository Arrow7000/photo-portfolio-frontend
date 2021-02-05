import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ArrowBack, Delete, Launch } from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { identity } from "ramda";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { apiUrl } from "../../components/config";
import { getPhotoById } from "../../components/data";
import {
  getChangedFields,
  getLargestImgUrl,
  pluraliseStr,
  stringToSlug,
  makeTuple,
} from "../../components/helpers";
import { PhotoPreview } from "../../components/PhotoPreview";
import { NextLink } from "../../components/Links";

export default function SinglePhotoAdmin() {
  const router = useRouter();
  const { photoId } = router.query;

  const [isLoading, setIsLoading] = useState(false);

  const [fullImage, setFullImage] = useState<FullPhoto | null>(null);

  // Intended for local modifications, to be synced when saved
  const [localPhotoCopy, setLocalPhotoCopy] = useState<NewPhoto | null>(null);

  const [newImage, setNewImage] = useState<File | null>(null);

  // Ideally this shouldn't be its own state but derived from newImage
  const [newImageDataUri, setNewImageDataUri] = useState<string | null>(null);

  const onChanger = <K extends StringKeys<NewPhoto>>(
    field: K,
    transformer = (x: NewPhoto[K]) => identity<NewPhoto[K]>(x)
  ) => (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setLocalPhotoCopy(
      (p) => p && { ...p, [field]: transformer(e.target.value) }
    );

  const changeImage = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];

      setNewImage(file);
    }
  };

  useEffect(() => {
    if (photoId !== undefined) {
      // not sure why it ever is undefined
      setFullImage(null);
      getPhotoById(photoId as Id).then(setFullImage);
    }
  }, [photoId]);

  useEffect(() => {
    if (fullImage !== null) {
      setLocalPhotoCopy(fullImage.photo);
    }
  }, [fullImage]);

  useEffect(() => {
    if (newImage) {
      const reader = new FileReader();
      reader.onload = (ev) =>
        ev.target && setNewImageDataUri(ev.target.result as string);

      reader.readAsDataURL(newImage);
    }
  }, [newImage]);

  const changedFields = [
    ...(fullImage && localPhotoCopy
      ? getChangedFields(fullImage.photo, localPhotoCopy)
      : []),
    ...(newImage ? [makeTuple("image", newImage)] : []),
  ];

  const cancelChanges = () => {
    fullImage && setLocalPhotoCopy(fullImage.photo);
    setNewImage(null);
    setNewImageDataUri(null);
  };

  const submitChanges = async () => {
    if (fullImage) {
      const form = new FormData();
      form.append("id", fullImage.photo.id);

      changedFields.forEach(([key, val]) => {
        if (typeof val !== "number") form.append(key, val);
      });

      setIsLoading(true);
      try {
        const result = await axios.patch<FullPhoto>(
          apiUrl + `/photo/${fullImage.photo.id}`,
          form
        );

        setFullImage(result.data);
        setNewImage(null);
        setNewImageDataUri(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const adminPath = "/admin";
  const goToAdmin = () => router.push(adminPath);

  const deletePhoto = async () => {
    if (fullImage) {
      await axios.delete(apiUrl + `/photo/${fullImage.photo.id}`);
      goToAdmin();
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
      <Head>
        <title>Edit {fullImage ? fullImage.photo.title : "Photo"}</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <NextLink href={adminPath}>
            <IconButton edge="start">
              <ArrowBack style={{ color: "white" }} />
            </IconButton>
          </NextLink>
          <Typography>
            Edit {fullImage ? fullImage.photo.title : "Photo"}
          </Typography>
          <IconButton>
            {fullImage && (
              <NextLink href={`/photo/${fullImage.photo.slug}`}>
                <Launch style={{ color: "white" }} />
              </NextLink>
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Container>
        {fullImage && localPhotoCopy ? (
          <>
            <PhotoPreview
              src={
                newImageDataUri
                  ? newImageDataUri
                  : getLargestImgUrl(fullImage.sizes)
              }
              {...getRootProps()}
            />
            <Grid container direction="column" justify="flex-start">
              <Button variant="contained" component="label">
                {isDragActive ? "Drop to upload" : "Change image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => changeImage(e.target.files)}
                  {...getInputProps()}
                />
              </Button>
              {/* Potentially only display placeholders for current values and use localPhotoCopy only for actual modifications, not always being a copy */}
              <TextField
                label="Title"
                onChange={onChanger("title")}
                value={localPhotoCopy.title}
                disabled={isLoading}
              />
              <TextField
                label="Slug"
                onChange={onChanger("slug", stringToSlug)}
                value={localPhotoCopy.slug}
                required
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
                onChange={onChanger("description")}
                value={localPhotoCopy.description}
                multiline
                disabled={isLoading}
              />
              <Grid container justify="space-between">
                <Box>
                  <Button
                    onClick={submitChanges}
                    disabled={isLoading || changedFields.length < 1}
                    color="primary"
                    variant="contained"
                  >
                    Submit{" "}
                    {changedFields.length > 0
                      ? `${changedFields.length}
                    ${pluraliseStr("change", changedFields.length)}`
                      : ""}
                  </Button>
                  <Button
                    onClick={cancelChanges}
                    disabled={isLoading || changedFields.length < 1}
                    variant="text"
                  >
                    Cancel
                  </Button>
                </Box>
                {/* This should make a dialog appear to ask user if they're sure */}
                <Button
                  color="secondary"
                  onClick={deletePhoto}
                  variant="outlined"
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container direction="row" justify="center" alignItems="center">
            {/* Add some vertical spacing so spinner isn't right below app bar */}
            <CircularProgress />
          </Grid>
        )}
      </Container>
    </>
  );
}
