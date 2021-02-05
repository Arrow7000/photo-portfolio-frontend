import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import { getSmallestImg } from "../../components/helpers";
import { PhotoPreview } from "../../components/PhotoPreview";

export default function AdminHome() {
  const [allPhotos, setAllPhotos] = useState<FullPhoto[]>([]);

  useEffect(() => {
    getAllPhotos().then(setAllPhotos);
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Typography>Photos</Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container>
        <Link href="/admin/new" passHref>
          <a>
            <Button variant="contained" size="large" color="primary">
              Create new photo
            </Button>
          </a>
        </Link>
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
                    <Link href={`/admin/${photo.id}`}>
                      <Button variant="contained" size="small">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <PhotoPreview src={getSmallestImg(sizes).imageUrl} />
                  </TableCell>
                  <TableCell>{photo.title}</TableCell>
                  <TableCell>
                    <Link href={`/photo/${photo.slug}`} passHref>
                      <MaterialLink>
                        <code>/photo/{photo.slug}</code>
                      </MaterialLink>
                    </Link>
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
