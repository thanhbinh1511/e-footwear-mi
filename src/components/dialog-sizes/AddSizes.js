import style from "./Style.module.scss";
import { Box, Button } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import DialogSize from "./DialogSizes";

const cx = classnames.bind(style);

function AddSizes() {
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
                Thêm size giày
            </Button>
            <DialogSize
                open={open}
                parentCallbackClose={handleClose}
            />
        </Box>
    );
}

export default AddSizes;
