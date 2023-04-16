import { Box, Button, Typography } from "@mui/material";
import style from "./Sizes.module.scss";
import classNames from "classnames/bind";
import { dataSizes } from "~/assets/data/fake-sizes";
import { Table, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import AddSizes from "~/components/dialog-sizes/AddSizes";
const cx = classNames.bind(style);
function Sizes() {
    const [editRow, setEdit] = useState(false);
    const handleDelete = (record) => { }
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Kích cỡ",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updated_at",
            key: "updated_at",


        }, {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => <Typography component={"span"} sx={{ color: "#4ec192" }}>{text}</Typography>
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => {
                return dataSizes.length >= 1 ? (
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
    const data = dataSizes.map((item, index) => {
        return {
            id: item.id,
            value: item.value,
            status: item.state,
            created_at: item.createdAt,
            updated_at: item.updatedAt,
        }
    }
    )
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Kích cỡ
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddSizes />
                </Box>
                <Box className={cx("wrap-table")}>
                    <Table dataSource={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
}
export default Sizes;

