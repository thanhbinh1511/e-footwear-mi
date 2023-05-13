import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import style from "./Style.module.scss";
import classnames from "classnames/bind";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { render } from "@testing-library/react";
import truncate from 'truncate-html';
const cx = classnames.bind(style);

function ViewProduct(props) {
    const [open, setOpen] = useState(false);
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            width: "350px",
        },
        {
            title: "Giảm giá",
            dataIndex: "sale",
            key: "sale",
            align: "center",
            render: (text) => <span>{text.toLocaleString()} %</span>,

        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
            align: "center",
            render: (images) => (
                <Box sx={{ display: "flex" }}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt="Product" style={{ width: "80px", height: "80px", margin: "5px" }} />
                    ))}
                </Box>
            )
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            align: "center",
            width: "500px",
            render: (description) => (
                <div dangerouslySetInnerHTML={{ __html: truncate(description, 100) }} />
            ),
        },
    ];
    const data = [{
        key: 1,
        name: props.name,
        sale: props.discountRate,
        image: props.images,
        description: props.description,
    },
    ]




    const handleClose = () => {
        setOpen(!open);
    };


    return (
        <Box className={cx("dialog-main")} >
            <Button disableElevation
                disableRipple
                style={{ backgroundColor: "transparent" }} onClick={() => setOpen(!open)}>
                <VisibilityIcon color="primary" />
            </Button>
            <Dialog open={open}
                onClose={handleClose}
                className={cx("dialog-content")}
                PaperProps={{
                    style: {
                        maxWidth: "1000px",
                        borderRadius: "10px",
                    },
                }}>
                <DialogTitle className={cx("dialog-title")} sx={{ fontWeight: "bold" }}>Thông tin sản phẩm</DialogTitle>
                <DialogContent>
                    <Table dataSource={data} columns={columns} pagination={false} />
                    <DialogActions>
                        <Box className={cx("dialog-actions")}>
                            <Button variant="outlined" className={cx("btn-cancel")} onClick={handleClose} >
                                Đóng
                            </Button>
                        </Box>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Box >
    )
}
export default ViewProduct;