import { Box, Typography } from "@mui/material";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./TypeGalleries.module.scss";
import { fetchAllTypeGalleries } from "~/redux/type-gallery/typeGalleriesSlice";
import { AddTypeGallery, DeleteTypeGallery, UpdateTypeGallery } from "~/components/crud-type-gallery";
const cx = classNames.bind(style);
function TypeGalleries() {
    const { typeGalleries, typeGalleryChanged } = useSelector((state) => state.typeGalleryReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllTypeGalleries());
    }, [dispatch]);
    useEffect(() => {
        if (typeGalleryChanged) {
            dispatch(fetchAllTypeGalleries());
        }
    }, [dispatch, typeGalleryChanged]);


    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mã loại ảnh",
            dataIndex: "typeCode",
            key: "typeCode",
        },
        {
            title: "Tên loại ảnh",
            dataIndex: "typeName",
            key: "typeName",
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
            key: "option",
            dataIndex: "option",
        },
    ];
    const data = typeGalleries.map((item, index) => {
        return {
            key: index,
            id: item.id,
            typeCode: item.typeCode,
            typeName: item.typeName,
            status: item.state,
            created_at: item.createAt,
            updated_at: item.updateAt,
            option: <Space>
                <DeleteTypeGallery id={item.id} />
                <UpdateTypeGallery id={item.id} typeCode={item.typeCode} typeName={item.typeName} />
            </Space>

        }
    }
    );

    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Quản lý loại ảnh
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddTypeGallery />
                </Box>
                <Box className={cx("wrap-table")}>
                    <Table columns={columns} dataSource={data} />
                </Box>
            </Box>
        </Box>
    );
}
export default TypeGalleries;

