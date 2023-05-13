import { Box, Typography } from "@mui/material";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Coupons.module.scss";
import { fetchAllCoupons } from "~/redux/coupon/couponsSlice";
import { AddCoupon, UpdateCoupon } from "~/components/crud-coupon";
// import { AddCoupon, UpdateCoupon } from "~/components/crud-coupon";
const cx = classNames.bind(style);
function Coupons() {
    const { coupons, couponChanged } = useSelector((state) => state.couponReducer);
    const { accessToken } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllCoupons(accessToken));
    }, [dispatch]);
    useEffect(() => {
        if (couponChanged) {
            dispatch(fetchAllCoupons(accessToken));
        }
    }, [dispatch, couponChanged]);


    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mã giảm giá",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Thời hạn",
            dataIndex: "endTime",
            key: "endTime",
            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
        },
        {
            title: "Số lượng sử dụng",
            dataIndex: "maxUsage",
            key: "maxUsage",
        },
        {
            title: "Số tiền giảm",
            dataIndex: "price",
            key: "price",
            render: (text) => <span>{text.toLocaleString()} đ</span>,


        },
        {
            title: "Hành động",
            key: "option",
            dataIndex: "option",
            align: "center",
        },
    ];
    const data = coupons.map((item, index) => {
        return {
            key: index,
            id: item.id,
            code: item.code,
            endTime: item.endTime,
            maxUsage: item.maxUsage,
            price: item.price,
            option: <Space>
                <UpdateCoupon id={item.id} code={item.code} endTime={item.endTime} maxUsage={item.maxUsage} price={item.price} />
            </Space>

        }
    }
    );

    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Quản lý mã giảm giá
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddCoupon />
                </Box>
                <Box className={cx("wrap-table")}>
                    <Table columns={columns} dataSource={data} />
                </Box>
            </Box>
        </Box>
    );
}
export default Coupons;

