import { useState, useEffect } from 'react';
import { 
    Grid, 
    Typography, 
    Card, 
    CardContent, 
    CardActions, 
    Button 
} from '@mui/material';
import { Container, Box } from '@mui/system';
import WelcomeName from '../components/WelcomeName';
import ContractMapping from '../build/deployments/map.json';
import ExtinctSoundsABI from '../build/contracts/ExtinctSounds.json';

import { 
    useAccount,
    useEnsName,
    useNetwork,
    useContractRead
} from "wagmi";

const Collection = () => {

    const [welcomeName, setWelcomeName] = useState<string | undefined>();

    const { address } = useAccount()
    const { data: ensName } = useEnsName({
        address: address, 
    })

    const { chain } = useNetwork()
    const contractChainId = chain?.id ? String(chain?.id) : "5"

    // @ts-ignore
    const contractAddress = ContractMapping[contractChainId]["ExtinctSounds"][0]
    const contractAbi = ExtinctSoundsABI.abi

    const { data: nftBalance, isError: nftBalanceError, isLoading: nftBalanceLoading } = useContractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'balanceOf',
        args: [address],
        watch: true,  
    })


    const { data, isError, isLoading } = useContractRead({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'ownerOf',
        args: [0],
        watch: true,  
    })

    const nNfts = nftBalance?.toString()
    console.log("data:", data)

    useEffect(() => {
        setWelcomeName(WelcomeName({address, ensName}));

    }, [address, ensName])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 4, ml: 12, mr: 12 }}>
                <Card sx={{ mt: 4 }}>
                    <CardContent sx={{ justifyContent:'center' }}>
                        <Typography sx={{ mb: 2 }} variant="h4" color="secondary">Welcome back <Box component="span" color="celadonblue">{welcomeName}!</Box>
                        </Typography>
                        <Typography variant="h6" color="honeydew">
                            Here you will find all of the NFTs you have previously redeemed.
                        </Typography> 
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>

            </Grid>

        </Grid>
    )

}
export default Collection;