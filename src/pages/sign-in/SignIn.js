import style from "./SignIn.module.scss";
import classNames from "classnames/bind";
import TextField from "@mui/material/TextField";

const cx = classNames.bind(style);

function SignIn() {
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
          <form className={cx("form-login")}>
            <div className={cx("form-group")}>
              <label className={cx("label")} htmlFor="User">
                Username
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="text"
                sx={{  '& .MuiInputBase-root': {
                    borderRadius: '15px',
                  }, }}
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
                sx={{  '& .MuiInputBase-root': {
                    borderRadius: '15px',
                  }, }}
              />
            </div>
            <div className={cx("button")}>
              <button className={cx("btn-login")}>Đăng nhập</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
