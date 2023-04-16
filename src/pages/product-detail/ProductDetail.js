import { Box, Typography } from "@mui/material";
import style from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
function ProductDetail() {
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Chi tiết sản phẩm
                </Typography>
            </Box>
            <Box className={cx("container")} >

            </Box>
        </Box>
    );
}
export default ProductDetail;