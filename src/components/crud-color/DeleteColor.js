import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteColor } from '~/redux/color/colorsSlice';
import style from "./Style.module.scss";
const cx = classnames.bind(style);

function DeleteColor(props) {
    const [open, setOpen] = useState(false);
    const { accessToken } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(!open);
    };
    const handleAction = (id) => {
        dispatch(fetchDeleteColor({ id, accessToken }));
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
                            form="color-form"
                        >
                            Xóa
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box >
    )
}
export default DeleteColor;