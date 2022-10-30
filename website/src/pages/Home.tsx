import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';

// @ts-ignore
const Home = ({address}) => {

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{ mt: 6 }} variant="h4" color="primary">Welcome {address}!</Typography>
                </Grid>
            </Grid>

        </Container>
    )
}
export default Home;