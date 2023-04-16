import classNames from "classnames/bind";
import React from "react";
import style from "./Style.module.scss";
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
function DialogSizes(props) {
    const handleClose = () => {
        props.parentCallbackClose(false);
    };

    return (
        <Box>
            <Dialog open={props.open}
                onClose={() => props.parentCallbackClose(false)}
                className={cx("dialog-content")}
                PaperProps={{
                    style: {
                        maxWidth: "300px",
                        width: "300px",
                        position: "relative",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Size giày</DialogTitle>
                <DialogContent>
                    <Box
                        id="size-form"
                        component={"form"}
                        className={cx("form")}
                    >
                        <Box className={cx("form-flex")}>
                            <Box>
                                <Box
                                    component={"label"}
                                    htmlFor="size"
                                    className={cx("form-label")}
                                >
                                    Kích cỡ
                                </Box>
                            </Box>
                            <TextField
                                variant="outlined"
                                type="number"
                                name="size"
                                id="size"
                                FormHelperTextProps={{ style: { fontSize: 12, borderRadius: 5 } }}
                                placeholder="Vui lòng nhập kích cỡ"
                                inputProps={{
                                    style: { fontSize: "1.1rem", padding: "1rem 1rem" },
                                }}
                            />
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
                            form="size-form"
                        >
                            Lưu
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
export default DialogSizes;