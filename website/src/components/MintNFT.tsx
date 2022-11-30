import { useState, useEffect } from 'react';
import { Button, IconButton, Link, Grid, Typography } from '@mui/material';
import ExtinctSoundsABI from '../build/contracts/ExtinctSounds.json';
import ContractMapping from '../build/deployments/map.json';
import { useContractWrite, usePrepareContractWrite, useNetwork, useAccount } from 'wagmi';
import NFTMapping from '../nfts.json';
import LoadingCircle from '../components/LoadingCircle';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

// @ts-ignore
const MintNFT = (params) => {
    
    const chosenNFT = params.chosenNFT;
    const numberOfGuesses = params.numberOfGuesses;

    // @ts-ignore
    const tokenURI = NFTMapping[chosenNFT][numberOfGuesses]

    const contractAddress = ContractMapping["5"]["ExtinctSounds"][0]
    const contractAbi = ExtinctSoundsABI.abi

    const [transactionHash, setTransactionHash] = useState<string | undefined>();
    const [transactionHashLink, setTransactionHashLink] = useState<string | undefined>();

    const { chain } = useNetwork()
    const { address, isConnected } = useAccount()

    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'safeMint',
        args: [address, tokenURI]
    })
    const { data, write, isIdle, isError, isLoading, isSuccess } = useContractWrite(config)
    
    const buttonContent = () => {
        if (isIdle) {
            return "Mint NFT"
        }
        if (isLoading) {
            return <LoadingCircle />
        }
        if (isError) {
            return <IconButton sx={{ color: "eerieblack" }}>Error <ClearIcon /></IconButton>
        }
        if (isSuccess) {
            return <IconButton sx={{ color: "eerieblack" }}>Success <DoneIcon /></IconButton>
        }
    }

    useEffect(() => {

        setTransactionHash(data?.hash)

        if (chain?.name === 'homestead') {
            setTransactionHashLink("https://etherscan.io/tx")
        } else {
            setTransactionHashLink(`https://${chain?.name}.etherscan.io/tx`)
        }

    }, [data, chain])

    return (
    <Grid 
        container 
        spacing={2} 
        direction="column"
        alignItems="center"
    >
        {!isConnected ? 
        <Grid item xs={12}>
            <Typography variant="body2">Please log in using the Connect Wallet button at the top of your screen in order to mint your reward!</Typography>
        </Grid>
        : <></>
        }
        <Grid item xs={12}>
            <Button 
                size="large" 
                variant="contained"
                sx={{ backgroundColor: "honeydew", color: "eerieblack" }}
                onClick={() => write?.()}
                disabled={!write}
            >
                {buttonContent()}
            </Button>
        </Grid>

        {transactionHashLink && transactionHash ? 
        <Grid item xs={12}>
            <Link 
                variant="caption" 
                href={`${transactionHashLink}/${transactionHash}`} 
                target="_blank"
            >
                {transactionHash}
            </Link>
        </Grid>
        : <></>
        }
    </Grid>
    )
}
export default MintNFT;