import { Box, Typography } from "@mui/material";
import classNames from "classnames/bind";
import style from "./Galleries.module.scss";
import { Table, Space } from "antd";
import { fetchAllGalleries } from "~/redux/gallery/galleriesSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddGallery, DeleteGallery, UpdateGallery } from "~/components/crud-gallerry";
const cx = classNames.bind(style);
function Galleries() {
    const { galleries, galleryChanged } = useSelector((state) => state.galleryReducer);
    const { accessToken } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllGalleries(accessToken));
    }, [dispatch]);

    useEffect(() => {
        if (galleryChanged) {
            dispatch(fetchAllGalleries(accessToken));
        }
    }, [dispatch, galleryChanged])

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {

            title: "Ảnh",
            dataIndex: "image_url",
            key: "image_url",
            render: (text) => <img src={text} alt="" style={{ width: "120px", height: "60px" }} />
        },
        {
            title: "Slug",
            dataIndex: "link",
            key: "link",
        },
        {
            title: "Loại ảnh",
            dataIndex: "type_gallery_id",
            key: "type_gallery_id",

        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => <Typography component={"span"} sx={{ color: "#4ec192" }}>{text}</Typography>
        },
        {
            title: "Hành động",
            key: "action",
            dataIndex: "option",
            align: "center",
        },

    ];
    const data = galleries.map((item, index) => {
        return {
            key: index,
            id: item.id,
            image_url: item.imageURL,
            link: item.link,
            title: item.title,
            type_gallery_id: item.typeGallery.typeName,
            status: item.state,
            option: <Space>
                <UpdateGallery id={item?.id} url={item?.imageURL} link={item?.link} title={item?.title} typeGallery={item?.typeGallery?.id} />
                <DeleteGallery id={item?.id} />
            </Space>
        }
    })
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Quản lý thư viện ảnh
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddGallery />
                </Box>
                <Box className={cx("wrap-table")}>
                    <Table dataSource={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    )
}
export default Galleries;