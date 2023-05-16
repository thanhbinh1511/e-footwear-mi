import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "~/hooks/useForm";
import { fetchUpdateCategory } from "~/redux/category/categoriesSlice";
import style from "./Style.module.scss";
import { fetchAllOrderStatus } from '~/redux/order-status/orderStatusSlice';
import { fetchUpdateOrderStatus } from '~/redux/order/orderSlice';
const cx = classnames.bind(style);

function UpdateStatusOrder(props) {
    const dispatch = useDispatch();
    const { orderStatus } = useSelector((state) => state.orderStatusReducer);
    const { accessToken } = useSelector((state) => state.authReducer);
    const [open, setOpen] = useState(false);
    const initialValues = {
        status: props?.status,
    };

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        setErrors({
            ...temp,
        });
        setErrorsEnable({
            ...tempEnable,
        });
        if (fieldValues === values) return Object.values(temp).every((x) => x === ""); // trả về boolean
    };
    const {
        values,
        setValues,
        errors,
        setErrors,
        errorsEnable,
        setErrorsEnable,
        handleInputChange,
        resetForm,
    } = useForm(initialValues, true, validate);
    const handleOpen = () => {
        dispatch(fetchAllOrderStatus(accessToken));
        setOpen(true);
    };

    const handleClose = (childData) => {
        setOpen(!open);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: props.idOrder,
            status: {
                id: values?.status
            }
        }
        dispatch(fetchUpdateOrderStatus({ data, accessToken }));
        resetForm();
        setValues({
            ...values, status: {
                id: values?.status
            }
        });
        setValues({ ...values, status: values?.status });
        setOpen(!open);
    };
    return (
        <Box className={cx("dialog-main")}>
            <Button disableElevation
                disableRipple
                style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
                <EditIcon color="warning" />
            </Button>
            <Dialog open={open}
                className={cx("dialog-content")}
                PaperProps={{
                    style: {
                        maxWidth: "400px",
                        width: "400px",
                        position: "relative",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>  Thay đổi trạng thái đơn hàng</DialogTitle>
                <DialogContent>
                    <Box
                        id="order_status"
                        component={"form"}
                        className={cx("form")}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="status"
                                    className={cx("form-label")}
                                >
                                    Loại
                                </Box>
                            </Box>
                            <TextField select
                                SelectProps={{
                                    native: true,
                                    style: { fontSize: '1.2rem' }
                                }} name="status"
                                id="status"
                                onChange={handleInputChange}
                                value={values.status}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}
                            >
                                {
                                    orderStatus?.map((item, index) => (
                                        <Box component={"option"} sx={{ fontSize: '1.2rem' }} key={item?.id} value={item?.id}>
                                            {item?.code}
                                        </Box>
                                    ))
                                }
                            </TextField>

                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box className={cx("dialog-actions")}>
                        <Button variant="outlined" className={cx("btn-cancel")} onClick={handleClose}>
                            Huỷ bỏ
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            className={cx("btn-save")}
                            form="order_status"
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default UpdateStatusOrder;
