import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "~/hooks/useForm";
import { fetchUpdateProductDetailById } from "~/redux/product-detail/productDetailSlice";
import style from "./Style.module.scss";
import Select from 'react-select';
import { fetchAllProducts } from '~/redux/product/productSlice';
import { fetchAllSizes } from '~/redux/size/sizesSlice';
const cx = classnames.bind(style);
function UpdateDetail(props) {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.productReducer);
    const { accessToken } = useSelector((state) => state.authReducer);
    const { sizes } = useSelector((state) => state.sizeReducer);
    const [open, setOpen] = useState(false);
    const [label, setLabel] = useState("");
    const handleOpen = () => {
        dispatch(fetchAllProducts(accessToken));
        dispatch(fetchAllSizes(accessToken));
        setLabel(props?.productName + " " + props?.colorName);
        setOpen(true);
    };
    const initialValues = {
        stockQuantity: props?.stockQuantity,
        size: props?.size,
        product: props?.product,
    };

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        if ("product" in fieldValues) {
            if (fieldValues.product === "") {
                tempEnable.product = true;
                temp.product = "Không được để trống.";
            } else {
                tempEnable.product = false;
                temp.product = "";
            }
        }
        if ("size" in fieldValues) {
            if (fieldValues.size === "") {
                tempEnable.size = true;
                temp.size = "Không được để trống.";
            } else {
                tempEnable.size = false;
                temp.size = "";
            }
        }

        if ("stockQuantity" in fieldValues) {
            if (fieldValues.stockQuantity === "") {
                tempEnable.stockQuantity = true;
                temp.stockQuantity = "Không được để trống.";
            } else {
                tempEnable.stockQuantity = false;
                temp.stockQuantity = "";
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
                stockQuantity: values?.stockQuantity,
                product: {
                    id: Number.parseInt(values?.product)
                },
                size: {
                    id: Number.parseInt(values?.size)
                }
            }
            dispatch(fetchUpdateProductDetailById(
                {
                    data, accessToken
                }));
            resetForm();
            setOpen(!open);
            setValues({ ...values, stockQuantity: values?.stockQuantity, product: values?.product, size: values?.size });
        }
    };
    const handleProductChange = (selectedOption) => {
        setLabel(selectedOption.label);
        setValues({
            ...values,
            product: selectedOption.value,
        });
    };
    const options = products?.map(function (item) {
        return { value: item.id, label: item.name + " " + item.color.name };
    })
    return (
        <Box className={cx("dialog-main")}>
            <Button disableElevation
                disableRipple
                style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
                <EditIcon color="warning" />
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
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}> Sửa Chi Tiết Sản Phấm</DialogTitle>
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
                            <Select
                                name="product"
                                id="product"
                                value={{ label: label, value: values.product }}
                                error={errorsEnable.product}
                                helperText={errors.product}
                                onChange={handleProductChange}
                                options={options}
                            >
                            </Select>

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
                                value={values.size}
                                error={errorsEnable.size}
                                helperText={errors.size}
                                onChange={handleInputChange}
                            >
                                {
                                    sizes?.map((item, index) => (
                                        <Box component={"option"} sx={{ fontSize: '1.2rem' }} key={item?.id} value={item?.id}>
                                            {item?.value}
                                        </Box>
                                    ))
                                }
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
                                value={values?.stockQuantity}
                                error={errorsEnable.stockQuantity}
                                helperText={errors.stockQuantity}
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

export default UpdateDetail;
