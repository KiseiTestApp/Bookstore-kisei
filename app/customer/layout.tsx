import Sidebar from '@/app/customer/components/Sidebar';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

export default function CustomerLayout({children} : {children: React.ReactNode}) {
    return (
        <Grid container display='flex' alignItems="flex-start" justifyContent='center' marginTop={3} marginX={4} spacing={2}>
            <Grid component={Paper} size={{xs: 12, md: 4, lg: 2}} padding={2}>
                <Sidebar />
            </Grid>
            <Grid component={Paper} size={{xs: 12, md: 8, lg: 10}} padding={2}>
                {children}
            </Grid>
        </Grid>
    )
}