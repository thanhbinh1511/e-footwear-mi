import style from "./Style.module.scss";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "~/hooks/useForm";
import { fetchCreateSize } from "~/redux/size/sizesSlice";
const cx = classnames.bind(style);

function AddSize() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { accessToken } = useSelector((state) => state.authReducer);
    const handleOpen = () => {
        setOpen(!open);
    };
    const initialValues = {
        value: "",
    };
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        if ("value" in fieldValues) {
            if (fieldValues.value === "") {
                tempEnable.value = true;
                temp.value = "Không được để trống.";
            } else {
                tempEnable.value = false;
                temp.value = "";
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
                value: values?.value,
            }
            dispatch(fetchCreateSize({
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
                Thêm size giày
            </Button>
            <Dialog open={open}
                onClose={handleClose}
                className={cx("dialog-content")}
                PaperProps={{
                    style: {
                        maxWidth: "300px",
                        width: "300px",
                        position: "relative",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Thêm Size Giày</DialogTitle>
                <DialogContent>
                    <Box
                        id="size-form"
                        component={"form"}
                        className={cx("form")}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Box className={cx("form-flex")}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="size"
                                    className={cx("form-label")}
                                >
                                    Kích cỡ
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="number"
                                name="value"
                                id="value"
                                onChange={handleInputChange}
                                value={values?.value}
                                error={errorsEnable?.value}
                                helperText={errors?.value}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập kích cỡ"
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
                            form="size-form"
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default AddSize;
