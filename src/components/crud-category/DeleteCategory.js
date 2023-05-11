import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import style from "./Style.module.scss";
import classnames from "classnames/bind";
import { fetchDeleteCategory } from "~/redux/category/categoriesSlice";
const cx = classnames.bind(style);

function DeleteCategory(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(!open);
    };

    const handleAction = (id) => {
        dispatch(fetchDeleteCategory(id));
        setOpen(!open);
    };
    return (
        <Box className={cx("dialog-main")} >
            <Button disableElevation
                disableRipple
                style={{ backgroundColor: "transparent" }} onClick={() => setOpen(!open)}>
                <DeleteIcon color="error" />
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
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Bạn có chắc chắn muốn xóa</DialogTitle>
                <DialogActions>
                    <Box className={cx("dialog-actions")}>
                        <Button variant="outlined" className={cx("btn-cancel")} onClick={handleClose}>
                            Huỷ bỏ
                        </Button>
                        <Button
                            onClick={() => handleAction(props.id)}
                            variant="contained"
                            type="submit"
                            className={cx("btn-save")}
                            form="category-form"
                        >
                            Xóa
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    )
}
export default DeleteCategory;