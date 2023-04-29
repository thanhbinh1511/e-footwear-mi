import { TextFields } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import style from "./Style.module.scss";
import { useForm } from "~/hooks/useForm";
import { useDispatch } from "react-redux";
import { fetchUpdateColor } from "~/redux/color/colorsSlice";

const cx = classnames.bind(style);

function UpdateColor(props) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const initialValues = {
        codeColor: props?.codeColor,
        name: props?.name,
    };
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        if ("codeColor" in fieldValues) {
            if (fieldValues.codeColor === "") {
                tempEnable.codeColor = true;
                temp.value = "Không được để trống.";
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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(fetchUpdateColor({
                id: props?.id,
                codeColor: values?.codeColor,
                name: values?.name,
            })
            );
            setOpen(!open);
        }
    };
    const handleOpen = async () => {
        setOpen(!open);
    };
    const handleClose = (childData) => {
        setOpen(!open);
    };
    return (
        <Box className={cx("dialog-main")}>
            <Button disableElevation
                disableRipple
                style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
                <EditIcon color="warning" />
            </Button>
            <Dialog
                open={open}
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
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Cập nhật màu sắc</DialogTitle>
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
                                placeholder="Vui lòng nhập mã màu sắc"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="nameColor"
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
                                placeholder="Vui lòng nhập tên màu sắc"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Box className={cx("dialog-actions")}>
                        <Button variant="outlined" className={cx("btn-cancel")} onClick={handleClose} >
                            Huỷ bỏ
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            className={cx("btn-save")}
                            form="size-form"
                            onClick={handleSubmit}
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default UpdateColor;
