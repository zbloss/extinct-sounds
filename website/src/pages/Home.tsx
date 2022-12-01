import { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { Container, Box } from '@mui/system';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import SoundCard from '../components/SoundCard';
import GetTokenMetadata from '../components/GetTokenMetadata';
import WelcomeName from '../components/WelcomeName';
import { useEnsName, useAccount } from 'wagmi';
import AddIPFSProxy from '../components/AddIPFSProxy';
import ChosenNFT from '../components/ChosenNFT';
import NFTMapping from '../nfts.json';

// @ts-ignore
const Home = () => {

    const chosenNFT = ChosenNFT();
    // @ts-ignore
    const tokenURI = AddIPFSProxy(NFTMapping[chosenNFT][1]);

    const { address } = useAccount()
    const { data: ensName } = useEnsName({
        address: address, 
    })

    const [showDetails, setShowDetails] = useState<boolean>(true);
    const [tokenMetadata, setTokenMetadata] = useState<string | undefined>();
    const [animationUrl, setAnimationUrl] = useState<string | undefined>();
    const [welcomeName, setWelcomeName] = useState<string | undefined>();

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

    useEffect(() => {
        const fetchTokenMetadata = async () => {
            // @ts-ignore
            const metadata = await GetTokenMetadata(tokenURI)
            setTokenMetadata(metadata)
            setAnimationUrl(metadata?.animation_url)
            
        }
        fetchTokenMetadata();
        setWelcomeName(WelcomeName({address, ensName}));

    }, [address, ensName, tokenURI])

    return (
        <Container>
            <Grid container spacing={2} sx={{ mt: 2 }}>  

                <Grid item xs={12} sx={{ mt: 2 }}>
                    <SoundCard imageUrl={animationUrl} metadata={tokenMetadata} address={address} chosenNFT={chosenNFT} />
                </Grid>

                <Grid item xs={12} >
                    <Card >
                        <CardContent sx={{ justifyContent:'center' }}>
                            <Typography sx={{ mb: 2 }} variant="h4" color="secondary">Welcome <Box component="span" color="celadonblue">{welcomeName}!</Box>
                            </Typography>
                            {showDetails ? 
                                <Typography variant="h6" color="honeydew">
                                    Extinct-Sounds is a fun game where you guess what "extinct" sound is being played, very similar to Wordle. Unlike the many Wordle spinoffs out there, Extinct-Sounds rewards you with a Redeemable NFT upon completing the puzzle each day.
                                </Typography> : <></>
                            }
                        </CardContent>
                        <CardActions sx={{ display:'flex', justifyContent:'center' }}>
                            {showDetails ? hideDetailsButton("hide-card-key") : showDetailsButton("show-card-key")}
                        </CardActions>
                        
                    </Card>
                </Grid>
            </Grid>

        </Container>
    )
}
export default Home;