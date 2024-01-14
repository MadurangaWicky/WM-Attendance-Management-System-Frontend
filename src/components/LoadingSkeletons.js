import React from 'react';
import { Stack, Skeleton } from '@mui/material';

const LoadingSkeletons = () => {
  return (
    <Stack spacing={2} >
            <Skeleton variant="text" />
            <Skeleton variant='text' />
            <Stack direction="row" spacing={4} >
                <Skeleton variant="rectangular" width={300} height={118} sx={{ mt: 5 }} />
                <Skeleton variant="circular" width={200} height={200} />
            </Stack>
                <Skeleton variant="rectangular" width={400} height={50} />
                <Skeleton variant="rectangular" width={400} height={50} />
                <Skeleton variant="rectangular" width={400} height={50} />
    </Stack>
  )
};

export default LoadingSkeletons;