import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import ShortenString from '../components/ShortenString';


// @ts-ignore
const Home = ({ethAddress, ensName, clickedLogIn}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (ethAddress === undefined && clickedLogIn === true) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [ethAddress, ensName, clickedLogIn]);

    const returnedObject = isLoading ? <CircularProgress /> : 
        <Grid container spacing={2}>
            {ethAddress ?
                <Grid item xs={12}>
                    <h1>Welcome <span className='text-secondary'>{ensName ? ensName : ShortenString(ethAddress)}!</span></h1>
                </Grid>
                : <></>
            }
        </Grid>
        
    return returnedObject
}
export default Home;