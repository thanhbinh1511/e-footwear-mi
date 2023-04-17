import style from "./Style.module.scss";
import { Box, Button } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import DialogCategory from "./DialogCategory";
import EditIcon from '@mui/icons-material/Edit';
const cx = classnames.bind(style);

function AddCategory() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (childData) => {
        setOpen(childData);
    };

    return (
        <Box className={cx("dialog-main")}>
            <Button  disableElevation
            disableRipple
            style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
                <EditIcon color="warning" />
            </Button>
            <DialogCategory
                open={open}
                parentCallbackClose={handleClose}
            />
        </Box>
    );
}

export default AddCategory;
