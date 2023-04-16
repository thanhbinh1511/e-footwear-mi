import { Box,Typography } from "@mui/material";
import style from "./ProductImage.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
function ProductImage() {
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Hình ảnh sản phẩm
                </Typography>
            </Box>
            <Box className={cx("container")} >

            </Box>
        </Box>

    );
}
export default ProductImage;