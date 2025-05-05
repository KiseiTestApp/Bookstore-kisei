import {Document, Page, Text, View, StyleSheet, Font} from "@react-pdf/renderer";
import {OrderDocument} from "@/app/types/order";


Font.register({
    family: 'Inconsolata',
    src: '/fonts/Inconsolata-Regular.ttf',
})
Font.register({
    family: 'Inconsolata Bold',
    src: '/fonts/Inconsolata-Bold.ttf',
})


const styles = StyleSheet.create({
    page: { padding: 40, fontSize: 12, fontFamily: 'Inconsolata' },
    header: { textAlign: "right", fontSize: 24, marginBottom: 20, fontFamily: 'Inconsolata Bold' },
    section: { marginBottom: 10 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    tableHeader: { marginTop: 20, borderBottom: 1, paddingBottom: 4, flexDirection: "row" },
    tableRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
    bold: { fontWeight: "bold" },
    total: { marginTop: 10, textAlign: "right" },
});

type OrderDocumentProps = {
    order: OrderDocument;
}
export default function InvoiceDocument({order}: OrderDocumentProps) {
    const taxAmount = order.totalPrice * 0.1;
    const total = order.totalPrice + taxAmount;
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.header}>INVOICE</Text>

                <View style={styles.section}>
                    <Text>Người mua hàng: </Text>
                    <Text>{order.customer.customer_name}</Text>
                    <Text>{order.customer.customer_phone}</Text>
                </View>

                <View style={styles.section}>
                    <Text>Mã hóa đơn: {order.orderId}</Text>
                    <Text>Ngày đặt hàng: {order.createdAt.toDate().toLocaleString()}</Text>
                    <Text></Text>
                </View>

                <View style={styles.section}>
                    <Text>Bên tạo hóa đơn:</Text>
                    <Text>Read&Chill</Text>
                    <Text>30 Hùng Vương - Tự Nhiên - Thường Tín</Text>
                    <Text>0384484103</Text>
                </View>

                <View style={styles.tableHeader}>
                    <Text style={{ flex: 3 }}>Tên sản phẩm</Text>
                    <Text style={{ flex: 1 }}>Đơn giá</Text>
                    <Text style={{ flex: 1 }}>Số lượng</Text>
                    <Text style={{ flex: 1 }}>Tổng</Text>
                </View>

                {order.items.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Text style={{ flex: 3 }}>{item.title}</Text>
                        <Text style={{ flex: 1 }}>{item.price}</Text>
                        <Text style={{ flex: 1 }}>{item.quantity}</Text>
                        <Text style={{ flex: 1 }}>{item.subtotal}</Text>
                    </View>
                ))}

                <View style={styles.total}>
                    <Text>Tổng tiền: {order.totalPrice.toLocaleString('vi-VN')} VNĐ</Text>
                    <Text>Thuế: 10%</Text>
                    <Text style={styles.bold}>Tổng tiền sau thuế: {total.toLocaleString('vi-VN')} VNĐ</Text>
                </View>
            </Page>
        </Document>
    )
}