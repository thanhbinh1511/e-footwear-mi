import style from "./Product.module.scss";
import classNames from "classnames/bind";
import { Box, Typography } from "@mui/material";
import DialogProduct from "~/components/dialog-product/DialogProduct";
import { dataProduct } from "~/assets/data/fake-productData";
import DataTableBase from "~/components/datatable-base/DataTableBase";

const cx = classNames.bind(style);
function Product() {
    const columns = [
        {
            name: "Tên sản phẩm",
            selector: row => row.name,
            sortable: true,
            width: "200px"
        },
        {
            name: "Thương hiệu",
            selector: row => row.brand,
            sortable: true,
            width: "120px"
        },
        {
            name: "Giá gốc",
            selector: row => row.price,
            sortable: true,
            width: "120px"
        },
        {
            name: "Giá khuyến mãi",
            selector: row => row.sale,
            sortable: true,
            width: "120px"
        },
        {
            name: "Màu sắc",
            selector: row => row.color,
            sortable: true,
            width: "120px"
        },
        {
            name: "Kích thước",
            selector: row => row.size,
            sortable: true,
            width: "120px"
        },
        {
            name: "Số lượng",
            selector: row => row.quantity,
            sortable: true,
            width: "120px"
        },
        {
            name: "Trạng thái",
            selector: row => row.status,
            sortable: true,
            width: "120px"
        },
    ]
    const data = dataProduct.map((item, index) => {
        return {
            id: index,
            name: item.name,
            brand: item.brand,
            price: item.price,
            sale: item.sale,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            status: item.status,
        }
    }
    )

    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Sản phẩm
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <DialogProduct />
                </Box>
                <Box className={cx("wrap-table")}>
                    <DataTableBase columns={columns} data={data} />
                </Box>
            </Box>
        </Box>
    );
}
export default Product;