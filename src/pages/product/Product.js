import style from "./Product.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { Box, Button, Typography } from "@mui/material";
import { dataProduct } from "~/assets/data/fake-productData";
import { Table, Popconfirm, Space } from "antd";
import { useState } from "react";
import DialogProduct from "~/components/dialog-product/DialogProduct";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const cx = classNames.bind(style);
function Product() {
    const [editRow, setEdit] = useState(false);
    const handleDelete = (record) => { }
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
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Giá gốc",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Giá khuyến mãi",
            dataIndex: "sale",
            key: "sale",
        },
        {
            title: "Màu sắc",
            dataIndex: "color",
            key: "color",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                return dataProduct.length >= 1 ? (
                    <Space>
                    <Popconfirm title="Bạn có chắc chắn xóa" onConfirm={() => handleDelete(record)}>
                        <DeleteIcon color="error" />
                    </Popconfirm>
                    <EditIcon color="warning" />

                </Space>
                ) : null;
            },
        },
    ];

    const data = dataProduct.map((item, index) => {
        return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            sale: item.sale,
            color: item.color,
            quantity: item.quantity,
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
                    <Table dataSource={data} columns={columns} />;
                </Box>
            </Box>
        </Box>
    );
}
export default Product;