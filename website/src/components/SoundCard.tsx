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
import LoadingBar from './LoadingBar';

// @ts-ignore
const SoundCard = (params) => {
    const imageUrl = params.imageUrl
    const metadata = params.metadata

    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState<string>('');
    const [guessCorrect, setGuessCorrect] = useState<boolean>(false);

    const appendGuess = () => {
        if (guesses.length <= 5) {    
            // @ts-ignore
            const newguesses = guesses.concat(guess)
            setGuesses(newguesses)
            
        }
    }

    const playAudio = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0];
        // @ts-ignore
        audioEl.play();
    };

    const showCardContent = (imageUrl: string) => {

        return (<>
        
            {/* @ts-ignore */}
            <CardMedia
                component={guessCorrect ? "video" : "audio"}
                sx={{ maxWidth: 600 }}
                src={imageUrl}
                alt="Live from space album cover"
                className='audio-element'
            />
            <CardContent sx={{ display:'flex', justifyContent:'center' }}>
                <Typography variant="h5">
                    Play Sound  
                    <IconButton aria-label="play/pause" onClick={playAudio}>
                        <PlayArrowIcon sx={{ height: 38, width: 38 }}/>
                    </IconButton>
                </Typography>
                
            </CardContent>
        </>)
    }

    const checkIfGuessIsCorrect = () => {
        if (guess && metadata) {
            // @ts-ignore
            if (guess === metadata.name || guesses.indexOf(metadata.name) !== -1) {
                setGuessCorrect(true);
            }
        }
    }

    useEffect(() => {
        checkIfGuessIsCorrect();
    }, [metadata, guess]);
  
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
        >
            <Grid item xs={12}>
                <Card sx={{ direction: "column", alignItems: "center", minWidth: 300 }}>
                    <Box >
                        {imageUrl === undefined || imageUrl === null ? 
                            <LoadingBar /> :     
                            showCardContent(imageUrl)
                        }
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
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    {metadata ? metadata.name : <></>}
                                </Typography>
                                <Typography variant="body2">
                                    {metadata ? metadata.description : <></>}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
export default SoundCard;