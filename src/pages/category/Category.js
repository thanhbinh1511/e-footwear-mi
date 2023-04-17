import style from "./Category.module.scss";
import classNames from "classnames/bind";
import { Box, Typography } from "@mui/material";
import { Table, Popconfirm, Space } from "antd";
import { dataCategories } from "~/assets/data/fake-category";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCategory from "~/components/dialog-category/AddCategory";
import { UpdateCategory } from "~/components/dialog-category";
const cx = classNames.bind(style);
function Category() {
    const handleDelete = (record) => { }
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",

        },
        {
            title: "Tên danh mục",
            dataIndex: "value",
            key: "value",

        },
        {
            title: "Ngày tạo",
            dataIndex: "create_at",
            key: "create_at",
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "update_at",
            key: "update_at",

        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => <Typography component={"span"} sx={{ color: "#4ec192" }}>{text}</Typography>
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                return dataCategories.length >= 1 ? (
                    <Space>
                        <Popconfirm title="Bạn có chắc chắn xóa" onConfirm={() => handleDelete(record)}>
                            <DeleteIcon color="error" />
                        </Popconfirm>
                        <UpdateCategory />
                    </Space>
                ) : null;
            },
        },
    ];
    const data = dataCategories.map((item, index) => {
        return {
            id: item.id,
            value: item.name,
            status: item.state,
            create_at: item.create_at,
            update_at: item.update_at,
        }
    }
    )
    return (

        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Danh mục
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddCategory />
                </Box>
                <Box className={cx("wrap-table")}>
                    <Table dataSource={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
}
export default Category;