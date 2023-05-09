import { Box, Tab, Typography } from "@mui/material";
import style from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductDetails } from "~/redux/product-detail/productDetailSlice";
import { useEffect } from "react";
import { Space, Table } from "antd";
import { Delete } from "@mui/icons-material";
import DeleteDetail from "~/components/crud-category/crud-detail/DeteleDetail";
import AddDetail from "~/components/crud-category/crud-detail/AddDetail";
import UpdateDetail from "~/components/crud-category/crud-detail/UpdateDetail";
const cx = classNames.bind(style);
function ProductDetail() {
    const { productDetails, productDetailChanged } = useSelector((state) => state.productDetailReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllProductDetails());
    }, [dispatch]);

    useEffect(() => {
        if (productDetailChanged) {
            dispatch(fetchAllProductDetails());
        }
    }, [dispatch, productDetailChanged])
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            width: "350px"

        },
        {
            title: "Màu sắc",
            dataIndex: "color",
            key: "color",
            align: "center"
        },
        {
            title: "Kích thước",
            dataIndex: "size",
            key: "size",
            align: "center"
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            align: "center"
        },
        {
            title: "Hành động",
            key: "option",
            dataIndex: "option",
            align: "center"
        },
    ]
    const data = productDetails?.map((item, index) => {
        return {
            key: index,
            id: item.id,
            name: item.product.name,
            color: item.product.color.name,
            size: item.size.value,
            quantity: item.stockQuantity,
            option:
                <Space>
                    <UpdateDetail id={item?.id} product={item.product.id} size={item.size.id} stockQuantity={item.stockQuantity} productName={item.product.name} colorName={item.product.color.name} />
                    <DeleteDetail id={item.id} />
                </Space>
        }
    }
    )

    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Chi tiết sản phẩm
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddDetail />
                </Box>

                <Box className={cx("wrap-table")}>
                    <Table dataSource={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
}
export default ProductDetail;