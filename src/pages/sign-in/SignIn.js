import style from "./SignIn.module.scss";
import classNames from "classnames/bind";
import TextField from "@mui/material/TextField";
import { Form, useForm } from "~/hooks/useForm";

const cx = classNames.bind(style);

function SignIn() {
  const initialFormValue = {
    username: "",
    password: "",
  };

  function validate(fieldValue = values) {
    console.log(fieldValue, values);
    let temp = { ...errors };
    let tempEnabled = { ...errorsEnabled };
    if ("username" in fieldValue) {
      if (fieldValue.username === "") {
        temp.username = "Không được để trống";
        tempEnabled.username = true;
      } else {
        temp.username = "";
        tempEnabled.username = false;
      }
    }
    if ("password" in fieldValue) {
      if (fieldValue.password === "") {
        temp.password = "Không được để trống";
        tempEnabled.password = true;
      } else {
        temp.password = "";
        tempEnabled.password = false;
      }
    }
    setErrors({
      ...temp,
    });
    setErrorsEnabled({
      ...tempEnabled,
    });

    if (fieldValue === values) {
      return Object.values(temp).every((x) => x === "");
    }
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    errorsEnabled,
    setErrorsEnabled,
    handleInputChange,
    resetForm,
  } = useForm(initialFormValue, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("submit");
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
                error={errorsEnabled.username}
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
                error={errorsEnabled.password}
                helperText={errors.password}
                value={values.password}
                FormHelperTextProps={{
                  style: {
                    fontSize: "14px",
                  },
                }}
                onChange={handleInputChange}
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
