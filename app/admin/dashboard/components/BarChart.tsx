"use client"

import {useState, useEffect} from "react";
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";
import {fetchAllOrders} from "@/app/utils/orders/fetchAllOrders";
import theme from "@/app/theme";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CircularProgress from "@mui/material/CircularProgress";

interface DailyRevenueData {
    date: string;
    revenue: number;
}

const RevenueBarChart = () => {
    const [chartData, setChartData] = useState<DailyRevenueData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }
    useEffect(() => {
        const calculateDailyRevenue = async () => {
            try {
                const orders = await fetchAllOrders();
                const dailyRevenueMap = orders.reduce((acc, order) => {
                    if (order.createdAt && order.totalPrice) {
                        const dateStr = order.createdAt.toDate().toISOString().split('T')[0];

                        if (!acc[dateStr]) {
                            acc[dateStr] = 0;
                        }

                        acc[dateStr] += order.totalPrice;
                    }
                    return acc;
                }, {} as Record<string, number>);
                const chartData = Object.entries(dailyRevenueMap)
                    .map(([date, revenue]) => ({date, revenue}))
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error("Error calculating daily revenue", error);
                setError("Failed to load revenue data");
                setLoading(false);
            }
        }
        calculateDailyRevenue();
    }, []);
    if (loading) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size={36} color="primary" />
            </Box>
        )
    }
    if (error) {
        return <div className="text-red-500">{error}</div>
    }
    if (chartData.length === 0) {
        return <div>No revenue data available</div>
    }
    return (
        <Box width="100%" height="480px" display="flex" flexDirection="column" padding={2} gap={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" gutterBottom>
                    Biểu đồ doanh thu
                </Typography>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Ngày"></Tab>
                    <Tab label="Tháng"></Tab>
                    <Tab label="Quý"></Tab>
                </Tabs>
            </Box>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        textAnchor="middle"
                        height={70}
                        tickFormatter={(date) => new Date(date).toLocaleDateString('vi-VN', {
                            month: 'short',
                            day: 'numeric'
                        })} />
                    <YAxis  />
                    <Tooltip
                        formatter={(value) => [`${value.toLocaleString('vi-VN')} VNĐ`, 'Doanh thu']}
                        labelFormatter={(date) => {
                            const utcDate = new Date(date);
                            return `Ngày: ${utcDate.toISOString().split('T')[0]} (UTC)`;
                        }}
                    />
                    <Bar dataKey="revenue" fill={theme.palette.primary.light} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
}
export default RevenueBarChart;