import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Style.module.scss";
import { useForm } from "~/hooks/useForm";
const cx = classnames.bind(style);


function AddDetail() {
    const dispatch = useDispatch();
    // const { products } = useSelector((state) => state.productReducer);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        // dispatch(fetchAllTypeGalleries());
        setOpen(true);
    };

    const initialValues = {
        stockQuantity: "",
        size: "",
        product: "",
    };
    const validate = (fieldValues = values) => {
        // setErrors({
        //     ...temp,
        // });
        // setErrorsEnable({
        //     ...tempEnable,
        // });
        // if (fieldValues === values) return Object.values(temp).every((x) => x === ""); // trả về boolean
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
            setOpen(!open);
            resetForm();
        }
    };



    return (
        <Box className={cx("dialog-main")}>
            <Button variant="contained" onClick={handleOpen}>
                Thêm Chi Tiết Sản Phẩm
            </Button>
            <Dialog open={open}
                className={cx("dialog-content")}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxWidth: "400px",
                        width: "400px",
                        position: "relative",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}> Thêm Chi Tiết Sản Phấm</DialogTitle>
                <DialogContent>
                    <Box
                        id="detail-form"
                        component={"form"}
                        className={cx("form")}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="product"
                                    className={cx("form-label")}
                                >
                                    Loại
                                </Box>
                            </Box>
                            <TextField select
                                SelectProps={{
                                    native: true,
                                    style: { fontSize: '1.2rem' }
                                }} name="product"
                                id="product"
                                onChange={handleInputChange}
                            // value={values.typeGallery}
                            // error={errorsEnable.typeGallery}
                            // helperText={errors.typeGallery}
                            // FormHelperTextProps={{ style: { fontSize: 12 } }}
                            >
                                <Box component="option" value="null">Chọn sản phẩm</Box>
                                {/* {
                                    typeGalleries?.map((item, index) => (
                                        <Box component={"option"} sx={{ fontSize: '1.2rem' }} key={item?.id} value={item?.id}>
                                            {item?.typeName}
                                        </Box>
                                    ))
                                } */}
                            </TextField>

                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="size"
                                    className={cx("form-label")}
                                >
                                    Kích cỡ
                                </Box>
                            </Box>
                            <TextField select
                                SelectProps={{
                                    native: true,
                                    style: { fontSize: '1.2rem' }
                                }} name="size"
                                id="size"
                                onChange={handleInputChange}
                            // value={values.typeGallery}
                            // error={errorsEnable.typeGallery}
                            // helperText={errors.typeGallery}
                            // FormHelperTextProps={{ style: { fontSize: 12 } }}
                            >
                                <Box component="option" value="null">Chọn kích cỡ</Box>
                                {/* {
                                    typeGalleries?.map((item, index) => (
                                        <Box component={"option"} sx={{ fontSize: '1.2rem' }} key={item?.id} value={item?.id}>
                                            {item?.typeName}
                                        </Box>
                                    ))
                                } */}
                            </TextField>

                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="stockQuantity"
                                    className={cx("form-label", "none-required")}
                                >
                                    Số lượng
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name="stockQuantity"
                                id="stockQuantity"
                                onChange={handleInputChange}
                                // value={values.link}
                                placeholder="Vui lòng nhập số lượng"
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
                            form="detail-form"
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default AddDetail;
