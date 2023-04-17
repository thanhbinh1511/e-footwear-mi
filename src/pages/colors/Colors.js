import { Box, Typography, Button } from "@mui/material";
import style from "./Colors.module.scss";
import classNames from "classnames/bind";
import { dataColors } from "~/assets/data/fake-colors";
import { Table, Popconfirm, Space } from "antd";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddColors from "~/components/dialog-colors/AddColors";
import { UpdateColors } from "~/components/dialog-colors";
const cx = classNames.bind(style);
function Colors() {
    const [editRow, setEdit] = useState(false);
    const handleDelete = (record) => { }
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mã màu",
            dataIndex: "code_color",
            key: "code_color",


        },
        {
            title: "Tên màu",
            dataIndex: "name_color",
            key: "name_color",

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
                return dataColors.length >= 1 ? (
                    <Space>
                        <Popconfirm title="Bạn có chắc chắn xóa" onConfirm={() => handleDelete(record)}>
                            <DeleteIcon color="error" />
                        </Popconfirm>
                        <UpdateColors />
                    </Space>
                ) : null;
            },
        },
    ];

    const data = dataColors.map((item, index) => {
        return {
            key: index,
            id: item.id,
            code_color: item.code_color,
            name_color: item.name_color,
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
                    Màu sắc
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddColors />
                </Box>
                <Box className={cx("wrap-table")}>
                    <Table dataSource={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    )
}
export default Colors;