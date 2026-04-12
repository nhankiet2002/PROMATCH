"use client";
// components
import Logo from "@components/Logo";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import { toast } from "react-toastify";
import Spring from "@components/Spring";
import PasswordInput from "@components/PasswordInput";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";

// utils
import classNames from "classnames";

// assets
import media from "@assets/login.webp";
import google from "@assets/icons/google.png";
import facebook from "@assets/icons/facebook.png";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { requestLogin, authState } from "@store/slices/auth.slice";
import { unwrapResult } from "@reduxjs/toolkit";

const AuthLayout = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(authState);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = unwrapResult(
        await dispatch(
          requestLogin({
            username: data.username,
            password: data.password,
          })
        )
      );
      if (res && res.data) {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.message || "Login failed. Please try again.");
    }
  };

  const onReject = (err) => {
    toast.error(err);
  };

  const handlePasswordReminder = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <Logo imgClass="w-[60px]" textClass="text-[28px]" />
          <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
            TeamFinder là nền tảng kết nối sinh viên với các dự án thực tế, giúp
            bạn phát triển kỹ năng và xây dựng hồ sơ ấn tượng.
          </p>
          <img className="max-w-[780px]" src={media} alt="media" />
        </div>
      )}
      <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
        <Spring
          className="max-w-[460px] w-full"
          type="slideUp"
          duration={400}
          delay={300}
        >
          <div className="flex flex-col gap-2.5 text-center">
            <h1>Chào mừng bạn!</h1>
          </div>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="field-wrapper">
                <label htmlFor="username" className="field-label">
                  Tên đăng nhập
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.username,
                  })}
                  id="username"
                  type="text"
                  placeholder="Tên đăng nhập của bạn"
                  {...register("username", {
                    required: true,
                  })}
                />
              </div>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PasswordInput
                    id="password"
                    placeholder="Mật khẩu của bạn"
                    error={errors.password}
                    innerRef={field.ref}
                    isInvalid={errors.password}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button className="text-btn" onClick={handlePasswordReminder}>
                Quên mật khẩu?
              </button>
              <button className="btn btn--primary w-full" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          </form>
          <div>
            <div className="relative">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-border" />
              <span className="flex items-center justify-center relative z-10 w-11 h-[23px] m-auto bg-widget">
                or
              </span>
            </div>

            <div className="flex justify-center gap-2.5 leading-none">
              <p>Chưa có tài khoản?</p>
              <button
                className="text-btn"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </Spring>
      </div>
    </div>
  );
};

export default AuthLayout;
