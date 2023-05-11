import { Box, Typography } from "@mui/material";
import { Space, Table } from "antd";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCategory, UpdateCategory } from "~/components/crud-category";
import AddCategory from "~/components/crud-category/AddCategory";
import { fetchAllCategories } from "~/redux/category/categoriesSlice";
import style from "./Category.module.scss";
const cx = classNames.bind(style);
function Category() {
    const { categories, categoryChanged } = useSelector((state) => state.categoryReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categoryChanged) {
            dispatch(fetchAllCategories());
        }
    }, [categoryChanged, dispatch]);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",

        },
        {
            title: "Tên danh mục",
            dataIndex: "value",
            key: "value",

        },
        {
            title: "Danh mục cha",
            dataIndex: "parent",
            key: "parent",

        },
        {
            title: "Ngày tạo",
            dataIndex: "create_at",
            key: "create_at",
            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "update_at",
            key: "update_at",
            render: (text) => <span>{new Date(text).toLocaleDateString()}</span>,

        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => <Typography component={"span"} sx={{ color: "#4ec192" }}>{text}</Typography>
        },
        {
            title: "Hành động",
            key: "option",
            dataIndex: "option",
            align: "center"

        },
    ];
    const data = categories.map((item, index) => {
        return {
            key: index,
            id: item.id,
            value: item.name,
            parent: item.category === null ? "" : item.category.name,
            status: item.state,
            create_at: item.createAt,
            update_at: item.updateAt,
            option:
                <Space>
                    <UpdateCategory id={item?.id} name={item?.name} parent={item?.category?.id} />
                    <DeleteCategory id={item?.id} />
                </Space>
        }
    }
    )
    return (

        <Box className={cx("main")}>
            <Box className={cx("wrap-header")}>
                <Typography className={cx("heading")}>
                    Danh mục
                </Typography>
            </Box>
            <Box className={cx("container")} >
                <Box className={cx("wrap-button")}>
                    <AddCategory />
                </Box>
                <Box className={cx("wrap-table")}>
                    <Table dataSource={data} columns={columns} />
                </Box>
            </Box>
        </Box>
    );
}
export default Category;