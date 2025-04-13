import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ProductsCountCard from "@/app/admin/dashboard/components/ProductsCountCard";
import UsersCountCard from "@/app/admin/dashboard/components/UsersCountCard";
import OrdersCountCard from "@/app/admin/dashboard/components/OrdersCountCard";
import PopularBooksCard from "@/app/admin/dashboard/components/PopularBooksCard";
import {Metadata} from "next";
import dynamic from "next/dynamic";

const RevenueBarChart = dynamic(() => import("@/app/admin/dashboard/components/BarChart"));

export const metadata: Metadata = {
    title: "Tổng quan",
}


export default async function Page() {
    return (
        <Box display="flex" flexDirection="column" sx={{ width: 1, height: 1}} className="overflow-hidden" paddingX={4} paddingY={6}>
            <Grid container spacing={2} alignItems="flex-start" columnSpacing={2} rowSpacing={4}>
                <Grid size={4}>
                    <ProductsCountCard />
                </Grid>
                <Grid size={4}>
                    <UsersCountCard />
                </Grid>
                <Grid size={4}>
                    <OrdersCountCard />
                </Grid>
                <Grid size={8} component={Paper}>
                    <RevenueBarChart />
                </Grid>
                <Grid size={4}>
                    <PopularBooksCard  />
                </Grid>
            </Grid>
        </Box>
    );
}