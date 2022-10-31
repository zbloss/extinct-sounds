import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Grid } from '@mui/material';

const SoundCard = () => {
  const theme = useTheme();

  const imageUrl = "https://imgs.search.brave.com/FPHR0VnYnneIffc_M8R5GjtdlQmcBQAdGSE1gBCvCjk/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly9hNC1p/bWFnZXMubXlzcGFj/ZWNkbi5jb20vaW1h/Z2VzMDQvMTAvYjRh/NDQxYzI4NzA1NDI1/Njk0ODNiOTdiY2I2/NmFhMWYvZnVsbC5q/cGc"

  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
    ><Grid item xs={12}>
        <Card >
            <Box >
                <CardMedia
                    component="img"
                    sx={{ maxWidth: 600 }}
                    image={imageUrl}
                    alt="Live from space album cover"
                />
                <CardContent sx={{ display:'flex', justifyContent:'center' }}>
                    <Typography variant="h5">
                        Play Sound  
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    </Typography>
                    <Box sx={{ }}>
                        
                    </Box>
                </CardContent>
            </Box>
        </Card>
    </Grid></Grid>
  );
}
export default SoundCard;