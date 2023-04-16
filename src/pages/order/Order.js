import style from "./Order.module.scss";
import classNames from "classnames/bind";
import { Box, Grid, Typography } from "@mui/material";

const cx = classNames.bind(style);
function Order() {
    // const columns = [
    //     {
    //         name: "Tên sản phẩm",
    //         selector: row => row.name,
    //         sortable: true,
    //         width: "200px"
    //     },
    //     {
    //         name: "Danh mục",
    //         selector: row => row.brand,
    //         sortable: true,
    //         width: "120px"
    //     },
    //     {
    //         name: "Giá gốc",
    //         selector: row => row.price,
    //         sortable: true,
    //         width: "120px"
    //     },
    //     {
    //         name: "Giá khuyến mãi",
    //         selector: row => row.sale,
    //         sortable: true,
    //         width: "120px"
    //     },
    //     {
    //         name: "Màu sắc",
    //         selector: row => row.color,
    //         sortable: true,
    //         width: "120px"
    //     },

    // ]
    // const data = dataProduct.map((item, index) => {
    //     return {
    //         id: index,
    //         name: item.name,
    //         brand: item.category,
    //         price: item.price,
    //         sale: item.sale,
    //         color: item.color,
    //         quantity: item.quantity,
    //     }
    // }
    // )
    return (

        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Đơn hàng
                </Typography>
            </Box>
            <Box className={cx("container")} >

            </Box>
        </Box>
    );
}
export default Order;