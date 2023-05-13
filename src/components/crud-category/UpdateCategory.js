import style from "./Style.module.scss";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, fetchUpdateCategory } from "~/redux/category/categoriesSlice";
import { useForm } from "~/hooks/useForm";
const cx = classnames.bind(style);

function UpdateCategory(props) {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoryReducer);
    const { accessToken } = useSelector((state) => state.authReducer);
    const [open, setOpen] = useState(false);
    const initialValues = {
        name: props?.name,
        parent: props?.parent,
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
        dispatch(fetchAllCategories());
        console.log(values.parent)
        console.log(props.parent)

        setOpen(true);
    };

    const handleClose = (childData) => {
        setOpen(!open);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const temp = values?.parent == "" ? null : { id: Number.parseInt(values?.parent) };
            const data = {
                id: props.id,
                name: values.name,
                category:
                    temp
            }
            dispatch(fetchUpdateCategory({
                data, accessToken
            }));
            resetForm();
            setValues({ ...values, parent: values?.parent == "" ? "" : Number.parseInt(values.parent) });
            setOpen(!open);
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
                className={cx("dialog-content")}
                PaperProps={{
                    style: {
                        maxWidth: "400px",
                        width: "400px",
                        position: "relative",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>  Sửa danh mục</DialogTitle>
                <DialogContent>
                    <Box
                        id="category-form"
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
                                    Tên danh mục
                                </Box>
                            </Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleInputChange}
                                error={errorsEnable.name}
                                helperText={errors.name}
                                FormHelperTextProps={{ style: { fontSize: 12 } }}
                                placeholder="Vui lòng nhập tên danh mục"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
                        </Box>
                        <Box className={cx("form-flex")} sx={{ marginBottom: "1rem" }}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="parent_id"
                                    className={cx("form-label")}
                                >
                                    Danh mục cha
                                </Box>
                            </Box>
                            <TextField select
                                SelectProps={{
                                    native: true,
                                    style: { fontSize: '1.2rem' }
                                }} name="parent" id="parent"
                                error={errorsEnable.parent} value={values.parent} onChange={handleInputChange}
                            >
                                <Box component={"option"} sx={{ fontSize: '1.2rem' }} value="">
                                    Chọn danh mục
                                </Box>
                                {

                                    categories?.map((item, index) => {
                                        if (item.id != props.id)
                                            return <Box component={"option"} sx={{ fontSize: '1.2rem' }} key={item.id} value={item.id} >
                                                {item.name}
                                            </Box>

                                    }

                                    )

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
                            form="category-form"
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default UpdateCategory;
