import { useState, useEffect } from 'react';
import { 
    Grid, 
    Typography, 
    Card, 
    CardContent
} from '@mui/material';
import { Box } from '@mui/system';
import WelcomeName from '../components/WelcomeName';
import NFTCard from '../components/NFTCard';
import AddIPFSProxy from '../components/AddIPFSProxy';
import GetTokenMetadata from '../components/GetTokenMetadata';
import ContractMapping from '../build/deployments/map.json';
import ExtinctSoundsABI from '../build/contracts/ExtinctSounds.json';


import { 
    useAccount,
    useEnsName,
    useNetwork,
    useContractRead,
    useContractReads
} from "wagmi";

const Collection = () => {

    const [welcomeName, setWelcomeName] = useState<string | undefined>();
    const [bulkOwnerOf, setBulkOwnerOf] = useState([]);
    const [usersTokenIds, setUsersTokenIds] = useState([]);
    // @ts-ignore
    const [bulkUserTokenMetadata, setBulkUserTokenMetadata] = useState();


    // @ts-ignore
    const [cards, setCards] = useState();


    const { address } = useAccount()
    const { data: ensName } = useEnsName({
        address: address, 
    })
    
    const { chain } = useNetwork()
    const contractChainId = chain?.id ? String(chain?.id) : "5"

    // @ts-ignore
    const contractAddress = ContractMapping[contractChainId]["ExtinctSounds"][0]
    const contractAbi = ExtinctSoundsABI.abi

    const combinedContract = {
        address: contractAddress,
        abi: contractAbi
    }

    const openseaUrl = chain?.id === 1 ? 
        "https://opensea.io/collection/extinctsounds" : 
        "https://testnets.opensea.io/collection/extinctsounds-v3"

    useContractRead({
        ...combinedContract,
        functionName: 'tokenCounter',
        onSuccess(m) {
            let tmpTokenIds = []
            // @ts-ignore
            if (m.toNumber() !== undefined) {
                // @ts-ignore
                for (let i = 0; i < m.toNumber(); i++) {
                    tmpTokenIds.push({
                        address: contractAddress,
                        abi: contractAbi,
                        functionName: 'ownerOf',
                        args: [i]
                    })
                }
                // @ts-ignore
                setBulkOwnerOf(tmpTokenIds)
            }
        },
    })


    useContractReads({
        contracts: bulkOwnerOf,
        onSuccess(n) {
            let tmpUsersTokenIds = []
            for (let i = 0; i < n.length; i++) {
                if (n[i] === address) {
                    tmpUsersTokenIds.push({
                        ...combinedContract,
                        functionName: 'tokenURI',
                        args: [i]
                    })
                }
            }
            // @ts-ignore
            setUsersTokenIds(tmpUsersTokenIds)
        },
    })

    const { data: userTokenURIs } = useContractReads({
        contracts: usersTokenIds,
        onSuccess(o) {
            // @ts-ignore
            let tmpBulkUserTokenMetadata = []
            o.forEach((uri) => {
                // @ts-ignore
                GetTokenMetadata(AddIPFSProxy(uri))
                    .then((e) => {
                        tmpBulkUserTokenMetadata.push(e);
                    })
            })

            // @ts-ignore
            setBulkUserTokenMetadata(tmpBulkUserTokenMetadata)
        }
    })

    useEffect(() => {
        setWelcomeName(WelcomeName({address, ensName}));  
        
        // @ts-ignore
        let tmpCards = []
        userTokenURIs?.forEach((uri, index) => {
            // @ts-ignore
            GetTokenMetadata(AddIPFSProxy(uri))
                .then((e) => {
                    tmpCards.push(
                        <Grid item xs={12} sm={12} md={4} key={`nft-card-${index}`}>
                            <NFTCard metadata={e} openseaUrl={openseaUrl} />
                        </Grid>
                    );
                })
            
            // @ts-ignore
            setCards(tmpCards)
        })

    }, [address, ensName, userTokenURIs, openseaUrl])
 
    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 4, ml: 8, mr: 8 }}>
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
        </Grid>

        <Grid container spacing={2} sx={{ mt: 4, ml: 8, mr: 8 }}>
            {cards}
        </Grid>

    </>)

}
export default Collection;