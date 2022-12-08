import { useState, useEffect } from 'react';
import { Grid, TextField, CardActions, Button, Box, Card, CardContent, CardMedia, Typography, InputAdornment } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import MintNFT from './MintNFT';
import LoadingBar from './LoadingBar';
import MaxNumberOfGuesses from '../constants/MaxNumberOfGuesses';
import GuessThreshold from '../constants/GuessThreshold';
// @ts-ignore
import stringSimilarity from 'string-similarity'
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

// @ts-ignore
const SoundCard = (params) => {
    const metadata = params.metadata;
    const audioUrl = params.metadata?.audio;
    const videoUrl = params.metadata?.animation_url;

    const chosenNFT = params.chosenNFT;
    const correctAnswer = metadata?.name.toLowerCase().replace(/[^\w\s]/gi, ' ');
    const greenBlock = "🟩 " 
    const blackBlock = "⬛ "
    const redBlock = "🟥 " 

    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState<string>('');
    const [guessCorrect, setGuessCorrect] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [shareButtonContent, setShareButtonContent] = useState<string>("Share");

    const tooManyGuesses = guesses?.length > MaxNumberOfGuesses();
    const guessesRemaining = MaxNumberOfGuesses() - guesses.length;

    const appendGuess = () => {
        if (guesses?.length <= 5) {    
            // @ts-ignore
            const newguesses = guesses.concat(guess.toLowerCase())
            setGuesses(newguesses)
            
        }
    }

    const showCardContent = () => {

        if(guessCorrect) {
            return (
                <Card sx={{ display: 'flex', minWidth: 300 }}>
                    {/* @ts-ignore */}
                    <CardMedia
                        component="video"
                        sx={{ mb: 2, mt: 2 }}
                        src={videoUrl}
                        alt="The extinct-sounds video of the day."
                        className='video-element'
                        controls={true}
                    />
                </Card>
            )
        } else {
            return (
                <Card sx={{ display: 'flex', minWidth: 300 }}>
                    {/* @ts-ignore */}
                    <CardMedia
                        component="audio"
                        sx={{ mb: 2, mt: 2 }}
                        src={audioUrl}
                        alt="The extinct-sounds of the day."
                        className='audio-element'
                        controls={true}
                    />
                </Card>
            )
        }
    }

    // @ts-ignore
    const checkIfCurrentGuessEqualsPreviousGuess = () => {

        // @ts-ignore
        if (guesses.slice(-1)[0] === guess.toLowerCase()) {
            alert("You've already tried that guess!")
            setGuess('')
            return true
        } else {
            return false
        }
    }

    // @ts-ignore
    const checkIfGuessIsCorrect = (list_of_guesses) => {
        if (list_of_guesses.length > 0) {
            let distance = stringSimilarity.compareTwoStrings(
                correctAnswer, 
                list_of_guesses[list_of_guesses.length - 1]
            )
            if (distance >= GuessThreshold()) {
                setGuessCorrect(true)
                return true
            }
            return false;
        }
        return guessCorrect
    }

    const guessField = (disabled: boolean) => {
        if (disabled) {
            return (
                <TextField 
                    label="Guess" 
                    variant="outlined" 
                    value={guess}
                    disabled
                />
            )
        } else {
            return (
                <TextField 
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

    const showDetailsButton = (key: string) => {
        return (
            <Button 
                size="small" 
                onClick={() => {setShowDetails(true)}}
                key={key}
            >
                Show Details <ArrowDropDown color="secondary" />
            </Button>
        )
    }

    const hideDetailsButton = (key: string) => {
        return (
            <Button 
                size="small" 
                onClick={() => {setShowDetails(false)}}
                key={key}
            >
                Hide Details <ArrowDropUp color="secondary" />
            </Button>
        )
    }


    const GenerateClipboardContent = async () => {

        let emojiString = ""
        guesses?.forEach((g) => {
            let correct = checkIfGuessIsCorrect([g])
            if (!correct) {
                emojiString += redBlock
            }
            if (correct) {
                emojiString += greenBlock
            }
        })
        let numberOfBlackBlocksToAdd = MaxNumberOfGuesses() - guesses.length;
        for (let i = 0; i < numberOfBlackBlocksToAdd; i++) {
            emojiString += blackBlock;
        }
        let clipboardContent = `Extinct-Sounds #${chosenNFT} 
${emojiString}
https://extinct-sounds.com`

        try {
            // @ts-ignore
            await navigator.clipboard.writeText(clipboardContent);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
    
    const changeButtonContent = () => {
        setShareButtonContent("Copied")
    }
    
    useEffect(() => {
        checkIfGuessIsCorrect(guesses);

        if (metadata !== undefined && metadata !== null && audioUrl !== undefined && videoUrl !== null) {
            setLoading(false);
        }

    }, [metadata, guesses, audioUrl, videoUrl]);
  
    return (
        <Grid
            container
            spacing={2}
            // direction="column"
            // alignItems="center"            
        >
            <Grid item xs={12}>
                <Card>
                    <Box >
                        <Grid 
                            container
                            direction="column"
                            alignItems="center"
                            sx={{ mb: 2, mt: 2 }}
                        >

                        {guessCorrect && !tooManyGuesses ?
                            <Grid item xs={12} >
                                <Typography variant="h3" color="honeydew">
                                    {metadata ? metadata.name : <></>}
                                </Typography> 
                            </Grid>
                            : <></>
                        }

                        <Grid item xs={12} sx={{ ml: 6, mr: 6}}>
                            {loading ? 
                                <LoadingBar /> :     
                                showCardContent()
                            }
                        </Grid>
                        {guessCorrect && !tooManyGuesses ? 
                            <Grid item xs={12} >
                                {showDetails ? 
                                    <CardContent >         
                                        <Typography variant="body2">
                                            {metadata ? metadata.description : <></>}
                                    
                                        </Typography>
                                </CardContent> : <></>
                                }
                                <CardActions sx={{ justifyContent:'center' }}>
                                    {showDetails ? hideDetailsButton("soundcard-hide-details-button") : showDetailsButton("soundcard-show-details-button")}
                                </CardActions>
                                <CardContent>
                                    <Grid container direction="column" alignItems="center">
                                        <Grid item xs={12} sx={{ mb: 2 }}>
                                            <MintNFT chosenNFT={chosenNFT} numberOfGuesses={guesses?.length} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button 
                                                size="large" 
                                                variant="contained"
                                                sx={{ backgroundColor: "powderblue", color: "eerieblack" }}
                                                onClick={() => {changeButtonContent();GenerateClipboardContent()}}
                                            >
                                                <Typography variant="h6">{shareButtonContent}</Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                
                            </Grid> : <></>
                        }
                            <Grid item xs={12} sx={{ mb: 2 }}>
                                {guessField(guessCorrect)}
                            </Grid>
                            <Grid item xs={12} sx={{ mb: 2 }}>
                                {guessesRemaining > 0
                                    ? <Typography>{guessesRemaining} Guesses Left </Typography> 
                                    : <Typography sx={{ ml: 4, mr: 4 }}>Sorry, you're out of guesses, please try again later. <br />The next Extinct-Sound is available in X time</Typography> 
                                }
                            </Grid>

                            {guesses?.map((v, index) => {
                                return (
                                    <Grid 
                                        item 
                                        xs={12} 
                                        id={`grid-previous-guesses-${index}`} 
                                        key={`grid-previous-guesses-${index}`}
                                        sx={{ mb: 1 }}
                                    >
                                        <TextField 
                                            disabled
                                            id={`previous-guesses-${index}`}
                                            key={`previous-guesses-${index}`}
                                            variant="filled" 
                                            InputProps={{
                                                // @ts-ignore
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        {index === guesses.length - 1 && guessCorrect ? <DoneIcon /> : <ClearIcon />}
                                                    </InputAdornment>
                                                ),
                                            }}
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