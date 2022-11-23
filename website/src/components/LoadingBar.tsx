import { Box, LinearProgress } from '@mui/material';

const LoadingBar = () => {

    return (
        <Box sx={{ width: '100%', color: 'celadonblue' }}>
            <LinearProgress color="inherit" />
        </Box>
  
    )

}
export default LoadingBar;