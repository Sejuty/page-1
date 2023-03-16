import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = { name: "", email: "", channel: "" };

const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  //values.name values.email values.channel
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.channel) {
    errors.channel = "Required";
  }
  return errors;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required!"),
  email: Yup.string().email("Invalid email address").required("Required!"),
  channel: Yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required!"),
});

function YouTubeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    // validate,
  });

  console.log("Form touched", formik.touched);

  //   console.log(formik.values);

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">YouTube Form</h1>
      <form className="max-w-sm" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="channel"
          >
            Channel:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className="text-red">{formik.errors.channel}</div>
          ) : null}
        </div>
        <button className="bg-black p-3 rounded text-white " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default YouTubeForm;
