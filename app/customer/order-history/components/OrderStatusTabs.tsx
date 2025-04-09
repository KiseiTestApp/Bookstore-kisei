import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {SyntheticEvent} from "react";

interface OrderStatusTabsProps {
    value: number;
    onChangeAction: (event: SyntheticEvent, newValue: number) => void;
}
export const OrderStatusTabs = ({ value, onChangeAction }: OrderStatusTabsProps) => {
    return (
        <Box borderBottom={1} borderColor="divider">
            <Tabs value={value} onChange={onChangeAction}>
                <Tab label="Tất cả đơn" id="order-tab-0"></Tab>
                <Tab label="Đang chờ" id="order-tab-1"></Tab>
                <Tab label="Đã được duyệt" id="order-tab-2"></Tab>
                <Tab label="Đã bị hủy" id="order-tab-3"></Tab>
            </Tabs>
        </Box>
    )
}