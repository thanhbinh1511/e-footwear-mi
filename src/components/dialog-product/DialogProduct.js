import classNames from "classnames/bind";
import React from "react";
import style from "./DialogProduct.module.scss";
import { Box } from '@mui/system';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
}
    from '@mui/material';
const cx = classNames.bind(style);
function DialogProduct() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                Thêm Sản Phẩm
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sản Phẩm</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tên sản phẩm"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="brand"
                        label="Thương hiệu"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <Box fullWidth>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label="Giá"
                            type="number"
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="sale"
                            label="Giá khuyến mãi"
                            type="number"
                            variant="standard"
                        />
                    </Box>
                    <Box fullWidth>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="color"
                            label="Màu sắc"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="size"
                            label="Kích thước"
                            type="number"
                            variant="standard"
                        />
                    </Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="quantity"
                        label="Số lượng"
                        type="number"
                        variant="standard"
                    />




                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Thoát</Button>
                    <Button onClick={handleClose}>Thêm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
export default DialogProduct;