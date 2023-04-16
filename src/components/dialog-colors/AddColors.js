import style from "./Style.module.scss";
import { Box, Button } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import DialogColors from "./DialogColors";

const cx = classnames.bind(style);

function AddColors() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (childData) => {
        setOpen(childData);
    };

    return (
        <Box className={cx("dialog-main")}>
            <Button variant="contained" onClick={handleOpen}>
                Thêm màu sắc
            </Button>
            <DialogColors
                open={open}
                parentCallbackClose={handleClose}
            />
        </Box>
    );
}

export default AddColors;
