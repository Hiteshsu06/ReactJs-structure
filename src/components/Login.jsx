// hooks
import { useRef, useState } from "react";

// components
import ButtonComponent from "@common/ButtonComponent";
import InputTextComponent from "@common/InputTextComponent";
import Image from "@common/Image";

// external libraries
import * as yup from "yup";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const data = {
  email: "",
  password: "",
};

const Login = () => {
  const toast = useRef(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const Logo = "";
  const { t } = useTranslation('msg');

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Please enter password more then 6 characters")
      .max(20, "Please enter password less then 20 characters")
      .required("Password is required"),
  });

  const onHandleSubmit = async (value) => {
    let formData = new FormData();
    setButtonLoader(true);

    formData.append("username", value.email);
    formData.append("password", value.password);
    try {

    } catch (e) {

    }
  };

  const formik = useFormik({
    initialValues: data,
    onSubmit: onHandleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnBlur: true,
  });

  const { values, errors, handleSubmit, handleChange, touched } = formik;

  return (
    <div className="px-20 py-5 max-lg:px-10 max-md:px-5">
      <Toast ref={toast} position="top-right" />
      <div className="flex justify-center">
        <Image src={Logo} width={50} height={50} alt="Google" />
      </div>
      <div className="text-center text-[1.5rem] font-[600] tracking-wide my-5 max-lg:text-[1.4em] max-sm:text-[1rem]">
      {t('welcome_back')}
      </div>
      <div className="mt-2 flex flex-col gap-2">
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
      <div className="mt-2 flex justify-between items-center">
        <div className="flex gap-2">
          <div>
          <input type="checkbox" />
          </div>
          <div className="text-[0.8rem]">keep me logged in</div>
        </div>
        <div className="underline underline-offset-2 text-[0.8rem] text-[#1f1f70] hover:cursor-pointer z-10">
          <Link href="/forgot-password">Forgot password</Link>
        </div>
      </div>
      <div className="mt-4">
        <ButtonComponent
          onClick={() => handleSubmit()}
          loading={buttonLoader}
          type="submit"
          label="Log in"
          className="px-6 py-2 w-full text-[12px] rounded bg-[#1f1f70] text-white"
          icon="pi pi-arrow-right"
          iconPos="right"
        />
      </div>
    </div>
  );
};

export default Login;