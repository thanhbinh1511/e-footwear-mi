import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Image from "mui-image";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Style.module.scss";
import { useForm } from "~/hooks/useForm";
import { fetchCreateProduct } from "~/redux/product/productSlice";
import { fetchAllCategories } from "~/redux/category/categoriesSlice";
import { fetchAllColors } from "~/redux/color/colorsSlice";
import Axios from "axios";
const cx = classnames.bind(style);
function AddProduct() {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoryReducer);
    const { accessToken } = useSelector((state) => state.authReducer);
    const { colors } = useSelector((state) => state.colorReducer);
    const [imageURLs, setImageURLs] = useState(["", "", "", ""]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        dispatch(fetchAllCategories(accessToken));
        dispatch(fetchAllColors(accessToken));
        setOpen(true);

    };

    const initialValues = {
        name: "",
        discountRate: "",
        originPrice: "",
        description: "",
        imageURL1: "",
        imageURL2: "",
        imageURL3: "",
        imageURL4: "",
        color: "",
        category: "",
    };
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        if ("name" in fieldValues) {
            if (fieldValues.name === "") {
                tempEnable.name = true;
                temp.name = "Không được để trống.";
            } else {
                tempEnable.name = false;
                temp.name = "";
            }
        }
        if ("discountRate" in fieldValues) {
            if (fieldValues.discountRate === "") {
                tempEnable.discountRate = true;
                temp.discountRate = "Không được để trống.";
            } else {
                tempEnable.discountRate = false;
                temp.discountRate = "";
            }
        }
        if ("originPrice" in fieldValues) {
            if (fieldValues.originPrice === "") {
                tempEnable.originPrice = true;
                temp.originPrice = "Không được để trống.";
            } else {
                tempEnable.originPrice = false;
                temp.originPrice = "";
            }
        }
        if ("description" in fieldValues) {
            if (fieldValues.description === "") {
                tempEnable.description = true;
                temp.description = "Không được để trống.";
            } else {
                tempEnable.description = false;
                temp.description = "";
            }
        }
        if ("imageURL1" in fieldValues) {
            if (fieldValues.imageURL1 === "") {
                tempEnable.imageURL1 = true;
                temp.imageURL1 = "Không được để trống.";
            } else {
                tempEnable.imageURL1 = false;
                temp.imageURL1 = "";
            }
        }
        if ("imageURL2" in fieldValues) {
            if (fieldValues.imageURL2 === "") {
                tempEnable.imageURL2 = true;
                temp.imageURL2 = "Không được để trống.";
            } else {
                tempEnable.imageURL2 = false;
                temp.imageURL2 = "";
            }
        }
        if ("imageURL3" in fieldValues) {
            if (fieldValues.imageURL3 === "") {
                tempEnable.imageURL3 = true;
                temp.imageURL3 = "Không được để trống.";
            } else {
                tempEnable.imageURL3 = false;
                temp.imageURL3 = "";
            }
        }
        if ("imageURL4" in fieldValues) {
            if (fieldValues.imageURL4 === "") {
                tempEnable.imageURL4 = true;
                temp.imageURL4 = "Không được để trống.";
            } else {
                tempEnable.imageURL4 = false;
                temp.imageURL4 = "";
            }
        }
        if ("color" in fieldValues) {
            if (fieldValues.color === "") {
                tempEnable.color = true;
                temp.color = "Không được để trống.";
            } else {
                tempEnable.color = false;
                temp.color = "";
            }

        }
        if ("category" in fieldValues) {
            if (fieldValues.category === "") {
                tempEnable.category = true;
                temp.category = "Không được để trống.";
            } else {
                tempEnable.category = false;
                temp.category = "";
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
        setImageURLs(["", "", "", ""]);
        setOpen(!open);
    };
    const handleFileChange = async (files, index) => {
        const uploadPromises = [];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append("file", files[i]);
            formData.append("upload_preset", "rygave5s");

            const uploadPromise = Axios.post("https://api.cloudinary.com/v1_1/di4tfql03/image/upload", formData);
            uploadPromises.push(uploadPromise);
        }

        await Axios.all(uploadPromises)
            .then((responses) => {
                responses.forEach((res) => {
                    const imageURL = res.data.url;
                    const updatedURLs = [...imageURLs];
                    updatedURLs[index - 1] = imageURL;
                    setImageURLs(updatedURLs);
                    const updatedValues = {
                        ...values,
                        [`imageURL${index}`]: imageURL
                    };
                    setValues(updatedValues);
                });
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const data = {
                name: values?.name,
                discountRate: values?.discountRate,
                originPrice: values?.originPrice,
                description: values?.description,
                category: {
                    id: values?.category,
                },
                color: {
                    id: values?.color,
                },
                images: [
                    {
                        imageURL: imageURLs[0],
                    },
                    {
                        imageURL: imageURLs[1],
                    },
                    {
                        imageURL: imageURLs[2],
                    },
                    {
                        imageURL: imageURLs[3],
                    },
                ]
            }
            dispatch(fetchCreateProduct({
                data, accessToken
            }));
            setOpen(!open);
            resetForm();
            setImageURLs(["", "", "", ""]);
        }
    }
    return (
        <Box className={cx("dialog-main")}>
            <Button variant="contained" onClick={handleOpen}>
                Thêm Sản phẩm
            </Button>
            <Dialog open={open}
                className={cx("dialog-content")}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxWidth: "600px",
                        width: "600px",
                        position: "relative",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}> Thêm Sản Phẩm</DialogTitle>
                <DialogContent>
                    <Box
                        id="product-form"
                        component={"form"}
                        className={cx("form")}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="name"
                                    className={cx("form-label")}
                                >
                                    Tên sản phẩm
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                error={errorsEnable.name}
                                helperText={errors.name}
                                onChange={handleInputChange}
                                placeholder="Vui lòng nhập tên sản phẩm"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }} >
                            <Box className={cx("form-flex")} sx={{ marginRight: "1rem" }}>
                                <Box>
                                    <Box
                                        component={"label"}
                                        htmlFor="discountRate"
                                        className={cx("form-label")}
                                    >
                                        % Giảm giá
                                    </Box>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="number"
                                    name="discountRate"
                                    id="discountRate"
                                    value={values.discountRate}
                                    error={errorsEnable.discountRate}
                                    helperText={errors.discountRate}
                                    onChange={handleInputChange}
                                    placeholder="Vui lòng nhập % giảm giá"
                                    inputProps={{
                                        style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                    }}
                                />
                            </Box>
                            <Box className={cx("form-flex")}>
                                <Box>
                                    <Box
                                        component={"label"}
                                        htmlFor="originPrice"
                                        className={cx("form-label")}
                                    >
                                        Giá gốc
                                    </Box>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="number"
                                    name="originPrice"
                                    id="originPrice"
                                    value={values.originPrice}
                                    error={errorsEnable.originPrice}
                                    helperText={errors.originPrice}
                                    onChange={handleInputChange}
                                    placeholder="Vui lòng nhập giá sản phẩm"
                                    inputProps={{
                                        style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="description"
                                    className={cx("form-label")}
                                >
                                    Mô tả
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name="description"
                                id="description"
                                value={values.description}
                                error={errorsEnable.description}
                                helperText={errors.description}
                                onChange={handleInputChange}
                                placeholder="Vui lòng nhập mô tả"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }} >
                            <Box className={cx("form-flex")}>
                                <Box>
                                    <Box
                                        component={"label"}
                                        htmlFor="imageURL1"
                                        className={cx("form-label")}
                                    >
                                        Thêm ảnh
                                    </Box>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="file"
                                    name="imageURL1"
                                    id="imageURL1"
                                    onChange={(event) => handleFileChange(event.target.files, 1)}
                                    error={errorsEnable.imageURL1}
                                    helperText={errors.imageURL1}
                                    FormHelperTextProps={{ style: { fontSize: 12 } }}
                                    placeholder="Vui lòng nhập đường dẫn ảnh"
                                    inputProps={{
                                        style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                    }}
                                />
                                <Image src={imageURLs[0]} className={cx("img-demo")} alt="" height="100px" width="100px" fit="cover" easing="ease-in-out" showLoading={true} />
                            </Box>
                            <Box className={cx("form-flex")}>
                                <Box>
                                    <Box
                                        component={"label"}
                                        htmlFor="imageURL2"
                                        className={cx("form-label")}
                                    >
                                        Thêm ảnh
                                    </Box>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="file"
                                    name="imageURL2"
                                    id="imageURL2"
                                    onChange={(event) => handleFileChange(event.target.files, 2)}
                                    error={errorsEnable.imageURL2}
                                    helperText={errors.imageURL2}
                                    FormHelperTextProps={{ style: { fontSize: 12 } }}
                                    placeholder="Vui lòng nhập đường dẫn ảnh"
                                    inputProps={{
                                        style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                    }}
                                />
                                <Image src={imageURLs[1]} className={cx("img-demo")} alt="" height="100px" width="100px" fit="cover" easing="ease-in-out" showLoading={true} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }} >
                            <Box className={cx("form-flex")}>
                                <Box>
                                    <Box
                                        component={"label"}
                                        htmlFor="imageURL3"
                                        className={cx("form-label")}
                                    >
                                        Thêm ảnh
                                    </Box>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="file"
                                    name="imageURL3"
                                    id="imageURL3"
                                    onChange={(event) => handleFileChange(event.target.files, 3)}
                                    error={errorsEnable.imageURL3}
                                    helperText={errors.imageURL3}
                                    FormHelperTextProps={{ style: { fontSize: 12 } }}
                                    placeholder="Vui lòng nhập đường dẫn ảnh"
                                    inputProps={{
                                        style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                    }}
                                />
                                <Image src={imageURLs[2]} className={cx("img-demo")} alt="" height="100px" width="100px" fit="cover" easing="ease-in-out" showLoading={true} />
                            </Box>
                            <Box className={cx("form-flex")}>
                                <Box>
                                    <Box
                                        component={"label"}
                                        htmlFor="imageURL4"
                                        className={cx("form-label")}
                                    >
                                        Thêm ảnh
                                    </Box>
                                </Box>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="file"
                                    name="imageURL4"
                                    id="imageURL4"
                                    onChange={(event) => handleFileChange(event.target.files, 4)}
                                    error={errorsEnable.imageURL4}
                                    helperText={errors.imageURL4}
                                    FormHelperTextProps={{ style: { fontSize: 12 } }}
                                    placeholder="Vui lòng nhập đường dẫn ảnh"
                                    inputProps={{
                                        style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                    }}
                                />
                                <Image src={imageURLs[3]} className={cx("img-demo")} alt="" height="100px" width="100px" fit="cover" easing="ease-in-out" showLoading={true} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }} >
                            <Box className={cx("form-flex")} sx={{ marginRight: "1rem" }}>
                                <Box>
                                    <Box
                                        component={"label"}
                                        htmlFor="color"
                                        className={cx("form-label")}
                                    >
                                        Màu sắc
                                    </Box>
                                </Box>
                                <TextField select
                                    SelectProps={{
                                        native: true,
                                        style: { fontSize: '1.2rem' }
                                    }} name="color"
                                    id="color"
                                    onChange={handleInputChange}
                                    value={values.color}
                                    error={errorsEnable.color}
                                    helperText={errors.color}
                                    FormHelperTextProps={{ style: { fontSize: 12 } }}

                                >
                                    <Box component="option" value="">Chọn màu sắc</Box>
                                    {
                                        colors?.map((item, index) => (
                                            <Box component={"option"} sx={{ fontSize: '1.2rem' }} key={item?.id} value={item?.id}>
                                                {item?.name}
                                            </Box>
                                        ))
                                    }
                                </TextField>

                            </Box>
                            <Box className={cx("form-flex")} >
                                <Box>
                                    <Box
                                        component={"label"}
                                        htmlFor="category"
                                        className={cx("form-label")}
                                    >
                                        Danh mục
                                    </Box>
                                </Box>
                                <TextField select
                                    SelectProps={{
                                        native: true,
                                        style: { fontSize: '1.2rem' }
                                    }} name="category"
                                    id="category"
                                    onChange={handleInputChange}
                                    value={values.category}
                                    error={errorsEnable.category}
                                    helperText={errors.category}
                                    FormHelperTextProps={{ style: { fontSize: 12 } }}
                                >

                                    <Box component="option" value="">Chọn màu sắc</Box>
                                    {
                                        categories?.map((item, index) => (
                                            <Box component={"option"} sx={{ fontSize: '1.2rem' }} key={item?.id} value={item?.id}>
                                                {item?.name}
                                            </Box>
                                        ))
                                    }
                                </TextField>
                            </Box>
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
                            form="product-form"
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default AddProduct;
