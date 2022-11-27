import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Grid, TextField, CardActions, Button } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import Cubes from '../constants/Cubes';
import LoadingBar from './LoadingBar';
import MaxNumberOfGuesses from '../constants/MaxNumberOfGuesses';


// @ts-ignore
const SoundCard = (params) => {
    const imageUrl = params.imageUrl
    const metadata = params.metadata

    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState<string>('');
    const [guessCorrect, setGuessCorrect] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [cubeGuesses, setCubeGuesses] = useState([]);

    const tooManyGuesses = guesses.length >= MaxNumberOfGuesses();

    const appendGuess = () => {
        if (guesses.length <= 5) {    
            // @ts-ignore
            const newguesses = guesses.concat(guess.toLowerCase())
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
                sx={{ maxWidth: 300 }}
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

    // @ts-ignore
    const checkIfCurrentGuessEqualsPreviousGuess = () => {
        // @ts-ignore
        if (guesses.slice(-1)[0] === guess.toLowerCase()) {
            return true
        } else {
            return false
        }
    }

    // @ts-ignore
    const checkIfGuessIsCorrect = (metadata, guesses) => {
        if (guesses && metadata) {
            // @ts-ignore
            if (guesses.indexOf(metadata.name.toLowerCase()) !== -1) {
                setGuessCorrect(true);
                console.log('green:', Cubes('green'))
            } else {

                console.log('red:', Cubes('red'))
            }
        }
    }

    const guessField = (disabled: boolean) => {
        if (disabled) {
            return (
                <TextField 
                    id="outlined-basic" 
                    label="Guess" 
                    variant="outlined" 
                    value={guess}
                    disabled
                />
            )
        } else {
            return (
                <TextField 
                    id="outlined-basic" 
                    label="Guess" 
                    variant="outlined" 
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            if (!checkIfCurrentGuessEqualsPreviousGuess()) {
                                // @ts-ignore
                                appendGuess();
                                setGuess('');
                            }
                        }
                    }}
                    value={guess}
                />
            )
        }
    }

    const showDetailsButton = () => {
        return (
            <Button 
                size="small" 
                onClick={() => {setShowDetails(true)}}
            >
                Show Details <ArrowDropDown color="secondary" />
            </Button>
        )
    }

    const hideDetailsButton = () => {
        return (
            <Button 
                size="small" 
                onClick={() => {setShowDetails(false)}}
            >
                Hide Details <ArrowDropUp color="secondary" />
            </Button>
        )
    }
        

    useEffect(() => {
        checkIfGuessIsCorrect(metadata, guesses);

        if (metadata !== undefined && metadata !== null && imageUrl !== undefined && imageUrl !== null) {
            setLoading(false);
        }

    }, [metadata, guesses, imageUrl]);
  
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
                        <Grid 
                            container
                            spacing={2}
                            direction="column"
                            alignItems="center"
                            sx={{ mb: 4, mt: 4 }}
                        >

                        {loading ? 
                            <LoadingBar /> :     
                            showCardContent(imageUrl)
                        }
                        {guessCorrect && !tooManyGuesses ? 
                            <Grid item xs={12} sx={{ ml: 15, mr: 15 }}>
                                <CardContent sx={{ justifyContent:'center' }}>
                                    <Typography variant="h5">
                                        {metadata ? metadata.name : <></>}
                                    </Typography>                
                                    {showDetails ? 
                                        <Typography variant="body2">
                                            {metadata ? metadata.description : <></>}
                                        </Typography> : <></>
                                    }
                        
                                </CardContent>
                                <CardActions sx={{ display:'flex', justifyContent:'center' }}>
                                    {showDetails ? hideDetailsButton() : showDetailsButton()}
                                </CardActions>
                            </Grid> : <></>
                        }
                            <Grid item xs={12} sx={{ mb: 4 }}>
                                {guessField(guessCorrect)}
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