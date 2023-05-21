import style from "./Customer.module.scss";
import classNames from "classnames/bind";
import { Box, Grid, Typography } from "@mui/material";
import { render } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllAccounts } from "~/redux/auth/authSlice";
import { Space, Table } from "antd";
import { ViewCustomer } from "~/components/view-customer";

const cx = classNames.bind(style);
function Customer() {
    const { accounts, accessToken } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllAccounts(accessToken));
    }, [dispatch]);
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role"
        },
        {
            title: "avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (text) => <img src={text} alt="" style={{ width: "120px", height: "60px" }} />
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
    ]
    const data = accounts.map((item, index) => {
        return {
            key: index,
            id: item.id,
            name: item.customer.firstName + " " + item.customer.lastName,
            birthday: item.customer.birthday,
            role: item.role,
            avatar: item.customer.avatar,
            status: item.isBlocked ? "Đã khóa" : "Đang hoạt động",
            option: <ViewCustomer id={item.id} />
        }
    }
    )
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Khách hàng
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
export default Customer;