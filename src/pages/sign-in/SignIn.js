import style from "./SignIn.module.scss";
import classNames from "classnames/bind";
import TextField from "@mui/material/TextField";
import { Form, useForm } from "~/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchLogin } from "~/redux/auth/authSlice";

const cx = classNames.bind(style);

function SignIn() {
  const { accountId, accessToken, isLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    let tempEnable = { ...errorsEnable };
    if ("username" in fieldValues) {
      if (fieldValues.username === "") {
        tempEnable.username = true;
        temp.username = "Không được để trống.";
      } else {
        tempEnable.username = false;
        temp.username = "";
      }
    }
    if ("password" in fieldValues) {
      if (fieldValues.password === "") {
        tempEnable.password = true;
        temp.password = "Không được để trống.";
      } else {
        tempEnable.password = false;
        temp.password = "";
      }
    }
    setErrors({
      ...temp,
    });
    setErrorsEnable({
      ...tempEnable,
    });
    if (fieldValues === values) return Object.values(temp).every((x) => x === ""); // trả về boolean
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    errorsEnable,
    setErrorsEnable,
    handleInputChange,
    resetForm,
  } = useForm(initialValues, true, validate);
  useEffect(() => {
    if (accessToken !== "" && accountId !== 0) {
      console.log(accessToken)
      navigate("/admin/dashboard");
    }
  }, [accountId, accessToken]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(fetchLogin(values));
      resetForm();
    }
  };
  return (
    <div className={cx("main")}>
      <div className={cx("wrap-login")}>
        <div className={cx("background-image")}>
          <div className={cx("background-image-overlay")}></div>
        </div>
        <div className={cx("container")}>
          <div className={cx("title-login")}>
            <div className={cx("title")}>Đăng nhập</div>
          </div>
          <Form className={cx("form-login")} onSubmit={handleSubmit}>
            <div className={cx("form-group")}>
              <label className={cx("label")} htmlFor="User">
                Tên đăng nhập
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                name="username"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "15px",
                  },
                }}
                error={errorsEnable.username}
                helperText={errors.username}
                value={values.username}
                onChange={handleInputChange}
                FormHelperTextProps={{
                  style: {
                    fontSize: "14px",
                  },
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <label className={cx("label")} htmlFor="Password">
                Mật khẩu
              </label>
              <TextField
                id="outlined-password-input"
                type="password"
                autoComplete="current-password"
                name="password"
                sx={{
                  "& .MuiInputBase-root": {
                    borderRadius: "15px",
                  },
                }}
                error={errorsEnable.password}
                helperText={errors.password}
                value={values.password}
                onChange={handleInputChange}
                FormHelperTextProps={{
                  style: {
                    fontSize: "14px",
                  },
                }}
              />
            </div>
            <div className={cx("button")}>
              <button type="submit" className={cx("btn-login")}>
                Đăng nhập
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default SignIn;
