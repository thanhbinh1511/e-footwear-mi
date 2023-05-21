import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "~/hooks/useForm";
import { fetchCreateCoupon } from "~/redux/coupon/couponsSlice";
import style from "./Style.module.scss";
const cx = classnames.bind(style);

function AddCoupon() {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.authReducer);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const initialValues = {
        code: "",
        maxUsage: "",
        price: "",
        endTime: "",
    };
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        if ("code" in fieldValues) {
            if (fieldValues.code === "") {
                tempEnable.code = true;
                temp.code = "Không được để trống.";
            } else {
                tempEnable.code = false;
                temp.code = "";
            }
        }
        if ("maxUsage" in fieldValues) {
            if (fieldValues.maxUsage === "") {
                tempEnable.maxUsage = true;
                temp.maxUsage = "Không được để trống.";
            } else {
                tempEnable.maxUsage = false;
                temp.maxUsage = "";
            }
        }
        if ("price" in fieldValues) {
            if (fieldValues.price === "") {
                tempEnable.price = true;
                temp.price = "Không được để trống.";
            } else {
                tempEnable.price = false;
                temp.price = "";
            }
        }
        if ("endTime" in fieldValues) {
            if (fieldValues.endTime === "") {
                tempEnable.endTime = true;
                temp.endTime = "Không được để trống.";
            } else {
                tempEnable.endTime = false;
                temp.endTime = "";
            }
        }
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
    const handleClose = (childData) => {
        resetForm();
        setOpen(!open);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const data = {
                code: values.code,
                maxUsage: values.maxUsage,
                price: values.price,
                endTime: values.endTime,
            }
            dispatch(fetchCreateCoupon({
                data, accessToken
            })
            );
            setOpen(!open);
            resetForm();
        }
    };
    return (
        <Box className={cx("dialog-main")} >
            <Button variant="contained" onClick={handleOpen}>
                Thêm mã giảm giá
            </Button>
            <Dialog open={open}
                onClose={handleClose}
                className={cx("dialog-content")}
                PaperProps={{
                    style: {
                        maxWidth: "350px",
                        width: "350px",
                        position: "relative",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Thêm Mã Giảm Giá</DialogTitle>
                <DialogContent>
                    <Box
                        id="coupon-form"
                        component={"form"}
                        className={cx("form")}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Box className={cx("form-flex")} sx={{ marginBottom: "10px" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="code"
                                    className={cx("form-label")}
                                >
                                    Mã giảm giá
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="text"
                                name="code"
                                id="code"
                                onChange={handleInputChange}
                                value={values?.code}
                                fullWidth
                                error={errorsEnable?.code}
                                helperText={errors?.code}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập mã giảm giá"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "10px" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="maxUsage"
                                    className={cx("form-label")}
                                >
                                    Số lượt sử dụng
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="number"
                                fullWidth
                                name="maxUsage"
                                id="maxUsage"
                                onChange={handleInputChange}
                                value={values?.maxUsage}
                                error={errorsEnable?.maxUsage}
                                helperText={errors?.maxUsage}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập số lượt sử dụng"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "10px" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="price"
                                    className={cx("form-label")}
                                >
                                    Số tiền giảm
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="number"
                                fullWidth
                                name="price"
                                id="price"
                                onChange={handleInputChange}
                                value={values?.price}
                                error={errorsEnable?.price}
                                helperText={errors?.price}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập số tiền giảm"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="endTime"
                                    className={cx("form-label")}
                                >
                                    Thời hạn
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="date"
                                name="endTime"
                                fullWidth
                                id="endTime"
                                onChange={handleInputChange}
                                value={values?.endTime}
                                error={errorsEnable?.endTime}
                                helperText={errors?.endTime}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập thời hạn mã giảm giá"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
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
                            form="coupon-form"

                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default AddCoupon;
