import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Grid, TextField } from '@mui/material';

const SoundCard = () => {

    const imageUrl = "https://imgs.search.brave.com/FPHR0VnYnneIffc_M8R5GjtdlQmcBQAdGSE1gBCvCjk/rs:fit:1200:1080:1/g:ce/aHR0cHM6Ly9hNC1p/bWFnZXMubXlzcGFj/ZWNkbi5jb20vaW1h/Z2VzMDQvMTAvYjRh/NDQxYzI4NzA1NDI1/Njk0ODNiOTdiY2I2/NmFhMWYvZnVsbC5q/cGc"

    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState<string>('');
    const appendGuess = () => {
        if (guesses.length <= 5) {    
            // @ts-ignore
            const newguesses = guesses.concat(guess)
            setGuesses(newguesses)
            
        }
    }


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
        >
            <Grid item xs={12}>
                <Card sx={{ direction: "column", alignItems: "center" }}>
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
                            
                        </CardContent>
                        <Grid 
                            container
                            spacing={2}
                            direction="column"
                            alignItems="center"
                            sx={{ mb: 4 }}
                        >
                            <Grid item xs={12} sx={{ mb: 4 }}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Guess" 
                                    variant="outlined" 
                                    onChange={(e) => setGuess(e.target.value)}
                                    onSubmit={(e) => {
                                        // @ts-ignore
                                        appendGuess();
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {

                                            // @ts-ignore
                                            appendGuess(); 
                                            setGuess('');
                                        }
                                    }}
                                    value={guess}
                                />
                            </Grid>
                            {guesses?.map((v, index) => {

                                return (
                                    <Grid item xs={12}>
                                        <TextField 
                                            disabled
                                            id={`previous-guesses-${index + 1}`}
                                            variant="filled" 
                                            value={v}
                                        />
                                    </Grid>
                                )
                            })}

                        </Grid>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
export default SoundCard;