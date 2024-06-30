import React, { useRef, useState } from "react";
import ButtonComponent from "@/common/components/ButtonComponent";
import InputTextComponent from "@/common/components/InputTextComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Toast } from "primereact/toast";
const data = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Signup = ({registrationSuccessfull}) => {
  const toast = useRef<any>(null);
  const [buttonLoader, setButtonLoader] = useState(false);

  const validationSchema = yup.object().shape({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Please enter password more then 6 characters")
      .max(20, "Please enter password less then 20 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .min(6, "Please enter password more then 6 characters")
      .max(20, "Please enter password less then 20 characters")
      .required("Confirm password is required")
      .oneOf(
        [yup.ref("password")],
        "Confirm password and New Password should be same"
      ),
  });
  const onHandleSubmit = async (value) => {
    let formData = new FormData();
    setButtonLoader(true);
    formData.append("firstname", value.firstname);
    formData.append("lastname", value.lastname);
    formData.append("email", value.email);
    formData.append("password", value.password);
    try {
      const response = await axios.post(
        "https://seo-ai-blog-backend-empty-firefly-3021.fly.dev/auth/register",
        formData
      );
      if (response.status == 200) {
        setButtonLoader(false);

        if (response.data.isError) {
          toast?.current.show({
            severity: "error",
            summary: "Error",

            detail: response.data.message,
            life: 3000,
          });
        } else {
          toast?.current.show({
            severity: "success",
            summary: "Success",
            detail: response.data.message,
            life: 3000,
          });
          registrationSuccessfull(true)
        }
      }
    } catch (e) {
      console.log({ e });
    }
  };
  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });
  const { values, errors, handleSubmit, handleChange, touched, handleBlur } =
    formik;
  return (
    <div className="px-20 max-lg:px-10 max-md:px-5">
      <Toast ref={toast} position="top-right" />
      <div className="text-left text-[1.5rem] font-[600] tracking-wide my-2 max-lg:text-[1.4em] max-xl:text-center max-sm:text-[1rem]">
        Register
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div>
          <InputTextComponent
            value={values?.firstname}
            onChange={handleChange}
            type="text"
            placeholder="Enter First Name"
            name="firstname"
            error={errors?.firstname}
            touched={touched?.firstname}
            className="text-[10px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
          />
        </div>
        <div>
          <InputTextComponent
            value={values?.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Enter Last Name"
            name="lastname"
            error={errors?.lastname}
            touched={touched?.lastname}
            className="text-[10px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
          />
        </div>
        <div>
          <InputTextComponent
            value={values?.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            name="email"
            error={errors?.email}
            touched={touched?.email}
            className="text-[10px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
          />
        </div>
        <div>
          <InputTextComponent
            value={values?.password}
            onChange={handleChange}
            type="password"
            placeholder="Your Password"
            name="password"
            error={errors?.password}
            touched={touched?.password}
            className="text-[10px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
          />
        </div>
        <div>
          <InputTextComponent
            value={values?.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Your Confirm Password"
            name="confirmPassword"
            error={errors?.confirmPassword}
            touched={touched?.confirmPassword}
            className="text-[10px] rounded  px-[1rem] py-[8px] focus:outline-none w-full border-[1px] border-[#ddd]"
          />
        </div>
      </div>
      <div className="mt-2 flex justify-start items-center">
        <div>
          <input type="checkbox" />
        </div>
        <div className="text-[0.8rem] ms-2">
          I agree to the Terms & Condition
        </div>
      </div>
      <div className="mt-6">
        <ButtonComponent
          onClick={() => handleSubmit()}
          loading={buttonLoader}
          type="submit"
          label="Sign up"
          className="px-6 py-2 w-full text-[12px] rounded bg-[#1f1f70] text-white"
        />
      </div>
    </div>
  );
};
export default Signup;
