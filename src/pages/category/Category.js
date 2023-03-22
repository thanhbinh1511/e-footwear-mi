import style from "./Category.module.scss";
import classNames from "classnames/bind";
import { Box, Grid, Typography } from "@mui/material";

const cx = classNames.bind(style);
function Category() {
    return (

        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Danh mục
                </Typography>
            </Box>
            <Box className={cx("container")} >

            </Box>
        </Box>
    );
}
export default Category;