import style from "./Style.module.scss";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "~/hooks/useForm";
import { fetchCreateColor } from "~/redux/color/colorsSlice";
const cx = classnames.bind(style);

function AddColor() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const initialValues = {
        codeColor: "",
        name: "",
    };
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        if ("codeColor" in fieldValues) {
            if (fieldValues.codeColor === "") {
                tempEnable.codeColor = true;
                temp.codeColor = "Không được để trống.";
            } else {
                tempEnable.codeColor = false;
                temp.codeColor = "";
            }
        }
        if ("name" in fieldValues) {
            if (fieldValues.name === "") {
                tempEnable.name = true;
                temp.name = "Không được để trống.";
            } else {
                tempEnable.name = false;
                temp.name = "";
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
        setOpen(!open);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(fetchCreateColor({
                codeColor: values?.codeColor,
                name: values?.name,
            })
            );
            setOpen(!open);
            resetForm();
        }
    };

    return (
        <Box className={cx("dialog-main")} >
            <Button variant="contained" onClick={handleOpen}>
                Thêm màu sắc
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
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Thêm Màu Sắc</DialogTitle>
                <DialogContent>
                    <Box
                        id="color-form"
                        component={"form"}
                        className={cx("form")}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Box className={cx("form-flex")}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="codeColor"
                                    className={cx("form-label")}
                                >
                                    Mã màu
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="text"
                                name="codeColor"
                                id="codeColor"
                                onChange={handleInputChange}
                                value={values?.codeColor}
                                error={errorsEnable?.codeColor}
                                helperText={errors?.codeColor}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập mã màu"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="name"
                                    className={cx("form-label")}
                                >
                                    Tên màu
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleInputChange}
                                value={values?.name}
                                error={errorsEnable?.name}
                                helperText={errors?.name}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập tên màu"
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
                            form="color-form"

                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default AddColor;
