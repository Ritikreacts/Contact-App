import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", {
            required: "Email is required",
            validate: (value) => {
              if (!value.match(/^\S+@\S+\.\S+$/)) {
                return "Email is invalid";
              } else {
                return true;
              }
            },
          })}
          type="text"
          placeholder="Email"
        />
        {errors.email && <div>{errors.email.message}</div>}

        <input
          {...register("password", {
            required: "Password is required",
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <div>{errors.password.message}</div>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Register;

// const onSubmit: SubmitHandler<FormFields> = (data) => {
//     console.log(data);
//     {...register("email")}
