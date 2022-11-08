import { useState } from 'react';
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { Container, Box } from '@mui/system';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import SoundCard from '../components/SoundCard';

// @ts-ignore
const Home = ({address}) => {

    const [showDetails, setShowDetails] = useState<boolean>(false);

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

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} sx={{ mt: 2 }}>  

                <Grid item xs={12} sx={{ mt: 2 }}>
                    <SoundCard imageUrl={"/assets/images/mac_miller.png"}/>
                </Grid>

                <Grid item xs={12} sm={2}></Grid>
                <Grid item xs={12} sm={8}>
                    <br/>
                    <Card sx={{ minWidth: 100 }}>
                        <CardContent sx={{ justifyContent:'center' }}>
                            <Typography sx={{ mb: 2 }} variant="h4" color="secondary">Welcome
                                {address ? <Box component="span" color="celadonblue"> {address}!</Box> : <>!</>}
                            </Typography>
                            {showDetails ? 
                                <Typography variant="h6" color="honeydew">
                                    Extinct-Sounds is a fun game where you guess what "extinct" sound is being played, very similar to Wordle. Unlike the many Wordle spinoffs out there, Extinct-Sounds rewards you with a Redeemable NFT upon completing the puzzle each day.
                                </Typography> : <></>
                            }
                        </CardContent>
                        <CardActions sx={{ display:'flex', justifyContent:'center' }}>
                            {showDetails ? hideDetailsButton() : showDetailsButton()}
                        </CardActions>
                        
                    </Card>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
            </Grid>

        </Container>
    )
}
export default Home;