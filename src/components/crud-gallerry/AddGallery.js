import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Style.module.scss";
import { useForm } from "~/hooks/useForm";
import { fetchCreateGallery } from "~/redux/gallery/galleriesSlice";
import { fetchAllTypeGalleries } from "~/redux/type-gallery/typeGalleriesSlice";
import { storage } from "~/utils/firebase";
const cx = classnames.bind(style);


function AddGallery() {
    const dispatch = useDispatch();
    const { typeGalleries } = useSelector((state) => state.typeGalleryReducer);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        dispatch(fetchAllTypeGalleries());
        setOpen(true);
    };

    const initialValues = {
        imageURL: "",
        link: "",
        title: "",
        typeGallery: "",
    };
    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        let tempEnable = { ...errorsEnable };
        if ("imageURL" in fieldValues) {
            if (fieldValues.imageURL === "") {
                tempEnable.imageURL = true;
                temp.imageURL = "Không được để trống.";
            } else {
                tempEnable.imageURL = false;
                temp.imageURL = "";
            }
        }
        if ("typeGallery" in fieldValues) {
            if (fieldValues.typeGallery === "") {
                tempEnable.typeGallery = true;
                temp.typeGallery = "Phải chọn loại ảnh";
            } else {
                tempEnable.typeGallery = false;
                temp.typeGallery = "";
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
            // // const imageFile = e.target.imageURL.files[0];  // Lỗi chỗ này nè ....
            // const storageRef = storage().ref('gallery-images/' + imageFile.name);
            // const uploadTask = storageRef.put(imageFile);
            // uploadTask.on(
            //     'state_changed',
            //     (snapshot) => {
            //         // Handle upload progress
            //     },
            //     (error) => {
            //         console.log(error);
            //     },
            //     () => {
            //         alert("Thêm ảnh thành công");
            //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            //             // Pass the download URL to the createGallery function
            dispatch(fetchCreateGallery({
                imageURL: values.imageURL,
                link: values.link,
                title: values.title,
                typeGallery: {
                    id: values.typeGallery,
                }
            }));
            setOpen(!open);
            resetForm();
        }; // Lỗi chỗ này nè .... ")"
    }
    //             );
    // }
    //     };


    return (
        <Box className={cx("dialog-main")}>
            <Button variant="contained" onClick={handleOpen}>
                Thêm ảnh
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
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}> Thêm Ảnh</DialogTitle>
                <DialogContent>
                    <Box
                        id="gallery-form"
                        component={"form"}
                        className={cx("form")}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="imageURL"
                                    className={cx("form-label")}
                                >
                                    Thêm ảnh
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name="imageURL"
                                id="imageURL"
                                onChange={handleInputChange}
                                value={values.imageURL}
                                error={errorsEnable.imageURL}
                                helperText={errors.imageURL}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}
                                placeholder="Vui lòng nhập đường dẫn ảnh"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="link"
                                    className={cx("form-label", "none-required")}
                                >
                                    Liên kết
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name="link"
                                id="link"
                                onChange={handleInputChange}
                                value={values.link}
                                placeholder="Vui lòng nhập liên kết"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="title"
                                    className={cx("form-label", "none-required")}
                                >
                                    Mô tả
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name="title"
                                id="title"
                                onChange={handleInputChange}
                                placeholder="Vui lòng nhập đường mô tả"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="type_gallery"
                                    className={cx("form-label")}
                                >
                                    Loại
                                </Box>
                            </Box>
                            <TextField select
                                SelectProps={{
                                    native: true,
                                    style: { fontSize: '1.2rem' }
                                }} name="typeGallery"
                                id="typeGallery"
                                onChange={handleInputChange}
                                value={values.typeGallery}
                                error={errorsEnable.typeGallery}
                                helperText={errors.typeGallery}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}

                            >

                                <Box component="option" value="null">Chọn loại ảnh</Box>
                                {
                                    typeGalleries?.map((item, index) => (
                                        <Box component={"option"} sx={{ fontSize: '1.2rem' }} key={item?.id} value={item?.id}>
                                            {item?.typeName}
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
                            form="gallery-form"
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default AddGallery;
