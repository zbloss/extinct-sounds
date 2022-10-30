import React from 'react';
import { useState } from 'react';
import { Grid, Button } from '@mui/material';
import LogIn from './LogIn';

// @ts-ignore
const Navbar = ({loggedInParams, logInClicked}) => {
    
    const [ethAddress, setEthAddress] = useState<string | undefined>();

    const LogInUser = async () => {

        logInClicked(true);
        const logInObjects = await LogIn();
        // @ts-ignore
        setEthAddress(logInObjects[2]);
        if (logInObjects[0] !== undefined && 
            logInObjects[1] !== undefined &&
            logInObjects[2] !== undefined) {
                loggedInParams(logInObjects);
            }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <h1>extinct-sounds</h1>
            </Grid>
            <Grid item xs={12} sm={6}>
                {ethAddress === undefined ?
                    <Button variant='contained' onClick={LogInUser}>Log In</Button> :
                    <Button variant='outlined'>Connected</Button>
                }
            </Grid>
        </Grid>
    )
}

export default Navbar;