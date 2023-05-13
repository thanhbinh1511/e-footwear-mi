import { Box, Typography } from "@mui/material";
import style from "./Colors.module.scss";
import classNames from "classnames/bind";
import { Table, Space } from "antd";
import { useEffect } from "react";
import AddColors from "~/components/crud-color/AddColor";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllColors } from "~/redux/color/colorsSlice";
import { DeleteColor, UpdateColor } from "~/components/crud-color";
const cx = classNames.bind(style);
function Colors() {
    const { colors, colorChanged } = useSelector((state) => state.colorReducer);
    const { accessToken } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllColors(accessToken));
    }, [dispatch]);

    useEffect(() => {
        if (colorChanged) {
            dispatch(fetchAllColors(accessToken));
        }
    }, [dispatch, colorChanged])
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
            render: (text) => <span style={{ color: text }}>{text}</span>,


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
            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "update_at",
            key: "update_at",
            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,

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
            dataIndex: "option",
            align: "center"
        },
    ];
    const data = colors.map((item, index) => {
        return {
            key: index,
            id: item.id,
            code_color: item.codeColor,
            name_color: item.name,
            status: item.state,
            create_at: item.createAt,
            update_at: item.updateAt,
            option: <Space>
                <UpdateColor id={item?.id} codeColor={item?.codeColor} name={item?.name} />
                <DeleteColor id={item?.id} />
            </Space>
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