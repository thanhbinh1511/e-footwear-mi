import { Box, Typography } from "@mui/material";
import style from "./recentUpdate.module.scss";
import classNames from "classnames/bind";
import { dataRecentUpdate } from "~/assets/data/fake-recent-data";

const cx = classNames.bind(style);
function RecentUpdate() {
    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap")}>
                <Typography className={cx("heading")}>Recent Update</Typography>
                <Box className={cx("wrap-content")}>
                    {dataRecentUpdate.map((item) => (
                        <Box className={cx("content")}>
                            <Box className={cx("wrap-image")}>
                                <img className={cx("avatar")} src={item.linkImage}></img>
                            </Box>
                            <Box className={cx("wrap-text")}>
                                <Typography className={cx("content")} >
                                    <span className={cx("name")}>{item.name} <span className={cx("action")}>{item.action} <span className={cx("product")}>{item.product}</span></span></span>
                                    <Typography className={cx("time")} >
                                        {item.time}
                                    </Typography>

                                </Typography>
                            </Box>
                        </Box>

                    ))}
                </Box>
            </Box>
        </Box>
    );
}
export default RecentUpdate;