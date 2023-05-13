import { Box, Typography } from "@mui/material";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteSize, UpdateSize } from "~/components/crud-size";
import AddSizes from "~/components/crud-size/AddSize";
import { fetchAllSizes } from "~/redux/size/sizesSlice";
import style from "./Sizes.module.scss";
const cx = classNames.bind(style);
function Sizes() {
    const { sizes, sizeChanged } = useSelector((state) => state.sizeReducer);
    const { accessToken } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllSizes(accessToken));
    }, [dispatch]);
    useEffect(() => {
        if (sizeChanged) {
            dispatch(fetchAllSizes(accessToken));
        }
    }, [dispatch, sizeChanged]);


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
            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,


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
            align: "center",
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
            option: <Space>
                <UpdateSize id={item?.id} value={item?.value} />
                <DeleteSize id={item?.id} />
            </Space>

        }
    }
    );

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
                    <Table columns={columns} dataSource={data} />
                </Box>
            </Box>
        </Box>
    );
}
export default Sizes;

