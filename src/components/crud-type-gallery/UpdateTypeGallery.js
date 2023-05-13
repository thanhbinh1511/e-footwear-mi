import style from "./Style.module.scss";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "~/hooks/useForm";
import { fetchUpdateTypeGallery } from "~/redux/type-gallery/typeGalleriesSlice";
const cx = classnames.bind(style);

function UpdateTypeGallery(props) {
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.authReducer);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    const initialValues = {
        typeCode: props?.typeCode,
        typeName: props?.typeName,
    };
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        if ("typeCode" in fieldValues) {
            if (fieldValues.typeCode === "") {
                tempEnable.typeCode = true;
                temp.typeCode = "Không được để trống.";
            } else {
                tempEnable.typeCode = false;
                temp.typeCode = "";
            }
        }
        if ("typeName" in fieldValues) {
            if (fieldValues.typeName === "") {
                tempEnable.typeName = true;
                temp.typeName = "Không được để trống.";
            } else {
                tempEnable.typeName = false;
                temp.typeName = "";
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
            const data = {
                id: props?.id,
                typeCode: values?.typeCode,
                typeName: values?.typeName,
            }
            dispatch(fetchUpdateTypeGallery({
                data, accessToken
            })
            );
            setOpen(!open);
            resetForm();
        }
    };
    return (
        <Box className={cx("dialog-main")}>
            <Button disableElevation
                disableRipple
                style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
                <EditIcon color="warning" />
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
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Thêm Loại Ảnhh</DialogTitle>
                <DialogContent>
                    <Box
                        id="type_gallery-form"
                        component={"form"}
                        className={cx("form")}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Box className={cx("form-flex")} sx={{ marginBottom: "10px" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="typeCode"
                                    className={cx("form-label")}
                                >
                                    Mã loại ảnh
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="text"
                                name="typeCode"
                                id="typeCode"
                                onChange={handleInputChange}
                                value={values?.typeCode}
                                error={errorsEnable?.typeCode}
                                helperText={errors?.typeCode}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập mã loại ảnh"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="typeName"
                                    className={cx("form-label")}
                                >
                                    Tên loại ảnh
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="text"
                                name="typeName"
                                id="typeName"
                                onChange={handleInputChange}
                                value={values?.typeName}
                                error={errorsEnable?.typeName}
                                helperText={errors?.typeName}
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập tên loại ảnh"
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
                            form="type_gallery-form"

                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default UpdateTypeGallery;
