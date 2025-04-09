import Sidebar from '@/app/customer/components/Sidebar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function CustomerLayout({children} : {children: React.ReactNode}) {
    return (
        <Box className="flex min-h-screen" alignItems="flex-start">
            <Paper sx={{ marginY: 5, marginX: 4, padding: 2}}>
                <Sidebar />
            </Paper>
            <Paper sx={{ marginY: 5, padding: 3, width: '70%' }}>
                {children}
            </Paper>
        </Box>
    )
}