import style from "./Style.module.scss";
import { Box, Button } from "@mui/material";
import classnames from "classnames/bind";
import { useState } from "react";
import DialogSize from "./DialogSizes";
import EditIcon from '@mui/icons-material/Edit';
import { dataSizes } from "~/assets/data/fake-sizes";
const cx = classnames.bind(style);

function UpdateSizes(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (childData) => {
        setOpen(childData);
    };
    const handleSubmit = (childData) => {
        setOpen(childData);
    };
    return (
        <Box className={cx("dialog-main")}>
            <Button disableElevation
                disableRipple
                style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
                <EditIcon color="warning" />
            </Button>
            <DialogSize
                open={open}
                parentCallbackClose={handleClose}
                parentCallbackSubmit={handleSubmit}
                data={dataSizes[props?.dataIndex]}
            />
        </Box>
    );
}

export default UpdateSizes;
