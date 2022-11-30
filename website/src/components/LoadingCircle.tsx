import { Box, CircularProgress } from '@mui/material';

const LoadingCircle = () => {
    return (
        <Box sx={{ width: '100%', color: 'celadonblue', mb: 3 }}>
            <CircularProgress color="inherit" />
        </Box>
    )

}
export default LoadingCircle;