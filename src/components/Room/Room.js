import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { red } from '@mui/material/colors';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import WcIcon from '@mui/icons-material/Wc';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const useStyles = styled({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});


export default function Room({room}){

  const classes = useStyles();
  const navigate = useNavigate();

  const handleBook = (bedType) => {
      navigate(`/book/${bedType}`);
  }
  
  return (
    <Card className={classes.root}>
      <CardHeader avatar={ <Avatar aria-label="recipe" className={classes.avatar}> {room.avatar} </Avatar> } title={room.title} />
      
      <CardMedia component="img" className={classes.media} image={room.imgUrl} alt="Paella dish" />

      {/* <img src={`/images/${room.bedType}.png`} alt=""/> */}

      <CardContent><Typography variant="body2" color="text.secondary">{room.description}</Typography></CardContent>

      <CardActions disableSpacing>

        <IconButton aria-label="add to favorites"><LocalHotelIcon />: {room.bed}</IconButton>
        <IconButton aria-label="share"><WcIcon />: {room.capacity}</IconButton>
        <IconButton aria-label="price"><AttachMoneyIcon />: {room.price}</IconButton>

        <Button onClick={() => handleBook(room.bedType)} variant="contained" color="primary">Book</Button>

      </CardActions>
    </Card>
  );
}
