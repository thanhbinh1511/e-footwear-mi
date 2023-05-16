import style from "./Order.module.scss";
import classNames from "classnames/bind";
import { Box, Typography } from "@mui/material";
import { Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "~/redux/order/orderSlice";
import { useEffect } from "react";
import { UpdateStatusOrder, ViewOrder } from "~/components/order";

const cx = classNames.bind(style);
function Order() {
    const { accessToken } = useSelector((state) => state.authReducer);
    const { orders, orderChanged } = useSelector((state) => state.orderReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllOrders(accessToken));
    }, [dispatch, accessToken]);
    useEffect(() => {
        if (orderChanged) {
            dispatch(fetchAllOrders(accessToken));
        }
    }, [dispatch, orderChanged, accessToken]);
    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "id",
            key: "id",
            width: "300px"
        },
        {
            title: "Mã giảm giá",
            dataIndex: "coupon",
            key: "coupon",
        },
        {
            title: "Phí vận chuyển",
            dataIndex: "transportFee",
            key: "transportFee",
            render: (text) => <span>{text.toLocaleString()} đ</span>
        },
        {
            title: "Tổng tiền",
            dataIndex: "cost",
            key: "cost",
            render: (text) => <span>{text.toLocaleString()} đ</span>
        },
        {
            title: "Trạng thái",
            dataIndex: "orderStatus",
            key: "orderStatus",

        },
        // {
        //     title: "Ngày tạo",
        //     dataIndex: "orderTime",
        //     key: "orderTime",
        // },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",

        },
        {
            title: "Hành động",
            key: "action",
            dataIndex: "option",
            align: "center"
        },
    ]
    const data = orders.map((item, index) => {
        return {
            key: index,
            id: item.id,
            coupon: item.coupon,
            transportFee: item.transportFee,
            cost: item.cost,
            orderStatus: item.orderStatus.code,
            // orderTime: item.orderTime,
            description: item.description,
            option:
                <Space>
                    <ViewOrder idOrder={item.id} idAccount={item.account.id} />
                    <UpdateStatusOrder idOrder={item.id} status={item.orderStatus.id} />
                </Space>
        }
    })
    return (

        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Đơn hàng
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                </Box>

                <Box className={cx("wrap-table")}>
                    <Table dataSource={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
}
export default Order;