import React, { useEffect, useState } from "react";
import { getAllPhotos } from "../../components/data";
import {
  AppBar,
  Button,
  Container,
  Link as MaterialLink,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import { getSmallestImgUrl } from "../../components/helpers";
import { PhotoPreview } from "../../components/PhotoPreview";
import { NextLink } from "../../components/Links";

export default function AdminHome() {
  const [allPhotos, setAllPhotos] = useState<FullPhoto[]>([]);

  useEffect(() => {
    getAllPhotos().then(setAllPhotos);
  }, []);

  return (
    <>
      <Head>
        <title>Photos Admin</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Typography>Photos Admin</Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container>
        <NextLink href="/admin/new">
          <Button variant="contained" size="large" color="primary">
            Create new photo
          </Button>
        </NextLink>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Photo</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Slug</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allPhotos.map(({ photo, sizes }) => (
                <TableRow key={photo.id}>
                  <TableCell size="small">
                    <NextLink href={`/admin/${photo.id}`}>
                      <Button variant="contained" size="small">
                        Edit
                      </Button>
                    </NextLink>
                  </TableCell>
                  <TableCell>
                    <PhotoPreview src={getSmallestImgUrl(sizes)} />
                  </TableCell>
                  <TableCell>{photo.title}</TableCell>
                  <TableCell>
                    <NextLink href={`/photo/${photo.slug}`}>
                      <MaterialLink component="span">
                        <code>/photo/{photo.slug}</code>
                      </MaterialLink>
                    </NextLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
