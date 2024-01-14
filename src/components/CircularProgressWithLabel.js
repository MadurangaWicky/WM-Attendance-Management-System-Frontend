import React from 'react';
import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const CircularProgressWithLabel = ({value}) => {

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= value ? value : prevProgress + 10));
        }, 40);

        return () => {
            clearInterval(timer);
        };
    }, [value]);

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', mt: 3 }}>
            <CircularProgress variant="determinate" value={progress} color="primary" size={230} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h3" color="primary">
                    {`${progress.toFixed(1)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

export default CircularProgressWithLabel;