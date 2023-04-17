import { Box, Button, Typography } from "@mui/material";
import style from "./Sizes.module.scss";
import classNames from "classnames/bind";
import { dataSizes } from "~/assets/data/fake-sizes";
import { Table, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import AddSizes from "~/components/dialog-sizes/AddSizes";
import { UpdateSizes } from "~/components/dialog-sizes";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSizes } from "~/redux/size/sizesSlice";
const cx = classNames.bind(style);
function Sizes() {
    const handleDelete = (record) => { }
    const sizes = useSelector((state) => state.sizeReducer.sizes);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllSizes());
    }, []);
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Kích cỡ",
            dataIndex: "size",
            key: "size",
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
            dataIndex: "key",
            render: (dataIndex, record) => {
                return dataSizes.length >= 1 ? (
                    <Space>
                        <Popconfirm title="Bạn có chắc chắn xóa" onConfirm={() => handleDelete(record)}>
                            <DeleteIcon color="error" />
                        </Popconfirm>
                        <UpdateSizes dataIndex={dataIndex} />
                    </Space>
                ) : null;
            },
        },
    ];
    const data = sizes.map((item, index) => {
        return {
            key: index,
            id: item.id,
            size: item.value,
            status: item.state,
            created_at: item.createAt,
            updated_at: item.updateAt,
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

