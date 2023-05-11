import { Box, Typography } from "@mui/material";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, DeleteProduct, ViewProduct } from "~/components/crud-product";
import { fetchAllProducts } from "~/redux/product/productSlice";
import style from "./Product.module.scss";
import UpdateProduct from "~/components/crud-product/UpdateProduct";

const cx = classNames.bind(style);
function Product() {
    const { products, productChanged } = useSelector((state) => state.productReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (productChanged) {
            dispatch(fetchAllProducts());
        }
    }, [dispatch, productChanged])
    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            width: "350px"
        },
        {
            title: "Giá gốc",
            dataIndex: "price",
            key: "price",
            render: (text) => <span>{text.toLocaleString()} đ</span>,
            align: "center",
        },
        {
            title: "Giá khuyến mãi",
            dataIndex: "sale",
            key: "sale",
            render: (text) => <span>{text.toLocaleString()} đ</span>,
            align: "center"
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Màu sắc",
            dataIndex: "color",
            key: "color",
        },
        {
            title: "Hành động",
            key: "action",
            dataIndex: "option",
            align: "center"
        },
    ];

    const data = products.map((item, index) => {
        const images = item.images.map(image => image.imageURL);
        return {
            key: index,
            id: item.id,
            name: item.name,
            price: item.originPrice,
            sale: item.discountPrice,
            category: item.category.name,
            color: item.color.name,
            option: <Space>
                <ViewProduct key={index} name={item.name} discountRate={item.discountRate} images={images} description={item.description} />
                <UpdateProduct id={item.id} name={item.name} discountRate={item.discountRate} originPrice={item.originPrice} description={item.description} category={item.category.id} color={item.color.id} images={images} />
                <DeleteProduct id={item.id} />
            </Space>

        }
    }
    )

    return (
        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Sản phẩm
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddProduct />
                </Box>

                <Box className={cx("wrap-table")}>
                    <Table dataSource={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
}
export default Product;