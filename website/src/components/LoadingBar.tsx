import { Box, LinearProgress } from '@mui/material';

const LoadingBar = () => {

    return (
        <Box sx={{ width: '100%', color: 'celadonblue', mb: 3 }}>
            <LinearProgress color="inherit" />
        </Box>
  
    )

}
export default LoadingBar;