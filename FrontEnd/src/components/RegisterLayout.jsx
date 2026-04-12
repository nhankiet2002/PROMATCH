// components
import Logo from "@components/Logo";
import { toast } from "react-toastify";
import Spring from "@components/Spring";
import PasswordInput from "@components/PasswordInput";

// hooks
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import { useState } from "react";

// utils
import classNames from "classnames";
import { client, Endpoint } from "@api/index";

// assets
import media from "@assets/login.webp";

const RegisterLayout = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      studentCode: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const response = await client.post(Endpoint.OTP_REGISTER, data);
      if (response && response.data) {
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 4xl:grid-cols-[minmax(0,_1030px)_minmax(0,_1fr)]">
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <Logo imgClass="w-[60px]" textClass="text-[28px]" />
          <p className="text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7 mx-auto">
            Gain data-based insights, view progress at a glance, and manage your
            organization smarter
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
            <h1>Create Account</h1>
            <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
              Fill in the details below to create your account
            </p>
          </div>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="field-wrapper">
                <label htmlFor="name" className="field-label">
                  Full Name
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.name,
                  })}
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="username" className="field-label">
                  Username
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.username,
                  })}
                  id="username"
                  type="text"
                  placeholder="Your username"
                  {...register("username", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.email,
                  })}
                  id="email"
                  type="email"
                  placeholder="Your email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PasswordInput
                    id="registerPassword"
                    placeholder="Your password"
                    error={errors.password}
                    innerRef={field.ref}
                    isInvalid={errors.password}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="field-wrapper">
                <label htmlFor="phoneNumber" className="field-label">
                  Phone Number
                </label>
                <input
                  className={classNames("field-input", {
                    "field-input--error": errors.phoneNumber,
                  })}
                  id="phoneNumber"
                  type="text"
                  placeholder="Your phone number"
                  {...register("phoneNumber", { required: true })}
                />
              </div>
              <div className="field-wrapper">
                <label htmlFor="studentCode" className="field-label">
                  Student Code{" "}
                  <span className="text-xs text-gray-400">(Optional)</span>
                </label>
                <input
                  className="field-input"
                  id="studentCode"
                  type="text"
                  placeholder="Your student code"
                  {...register("studentCode")}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 mt-4 mb-10">
              <button
                className="btn btn--primary w-full"
                disabled={submitting}
              >
                {submitting ? "Creating account..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="flex justify-center gap-2.5 leading-none">
            <p>Already have an account?</p>
            <button className="text-btn" onClick={() => navigate("/login")}>
              Log In
            </button>
          </div>
        </Spring>
      </div>
    </div>
  );
};

export default RegisterLayout;
