import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Table } from "antd";
import classnames from "classnames/bind";
import { useEffect, useState } from "react";
import truncate from 'truncate-html';
import style from "./Style.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAddressByUserId } from '~/redux/address/addressSlice';
const cx = classnames.bind(style);

function ViewCustomer(props) {
    const { accessToken } = useSelector((state) => state.authReducer);
    const { addresses } = useSelector((state) => state.addressReducer);
    const dispatch = useDispatch();
    const handleOpen = () => {
        const id = props.id;
        dispatch(fetchAllAddressByUserId({ id, accessToken }));
        setOpen(!open);
    };

    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Đường",
            dataIndex: "ward",
            key: "ward",
        },
        {
            title: "Huyện",
            dataIndex: "district",
            key: "district",
        },
        {
            title: "Tỉnh",
            dataIndex: "province",
            key: "province",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",

        }

    ];


    const handleClose = () => {
        setOpen(!open);
    };
    const data = addresses.map((item, index) => {
        return {
            key: index,
            id: item.id,
            phone: item.phone,
            email: item.email,
            ward: item.addresses.wardName,
            district: item.addresses.districtName,
            province: item.addresses.provinceName,
            address: item.address,
            status: item.isDefault ? "Mặc định" : "",
        }
    }
    )
    return (
        <Box className={cx("dialog-main")} >
            <Button disableElevation
                disableRipple
                style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
                <VisibilityIcon color="primary" />
            </Button>
            <Dialog open={open}
                onClose={handleClose}
                className={cx("dialog-content")}
                PaperProps={{
                    style: {
                        maxWidth: "1000px",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Thông tin chi tiêt</DialogTitle>
                <DialogContent>
                    <Table dataSource={data} columns={columns} pagination={false} />
                    <DialogActions>
                        <Box className={cx("dialog-actions")}>
                            <Button variant="outlined" className={cx("btn-cancel")} onClick={handleClose} >
                                Đóng
                            </Button>
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box >
    )
}
export default ViewCustomer;