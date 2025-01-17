import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import { CardContent, Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import { Box } from "@mui/system";

function stringToColor(string) {
  let hash = 0;
  /* eslint-disable no-bitwise */
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringBackground(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      maxWidth: 200,
      maxHeight: 200,
      ml: "0.5rem",
      pb:0
    },
    children: name[0],
  };
}

function FeaturedPost(props) {
  const { post } = props;

  return (
    <Card {...stringBackground(post.title)}>
      <CardActionArea>
        <CardContent sx={{ pt: "7px", pb:"10px" }}>
          <Typography sx={{ textAlign: "center", color: "white" }}>
            {post.title}
          </Typography>
        </CardContent>
        <Box sx={{pl:"5px", pr:"5px", pb:"5px"}}>
          <CardMedia
            component="img"
            height="150"
            image={post.image}
            alt={post.imageLabel}
            sx={{ bgcolor: "white" }}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
