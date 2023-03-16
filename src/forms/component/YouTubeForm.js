import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phone: ["", ""],
  phNumbers: [""],
};
const savedValues = {
  name: "Sejuty",
  email: "s@gmail.com",
  channel: "Hello World",
  comments: "Life peramoi",
  address: "Chittagong",
  social: {
    facebook: "",
    twitter: "",
  },
  phone: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm()
};

// const validate = (values) => {
//   //values.name values.email values.channel
//   let errors = {};

//   if (!values.name) {
//     errors.name = "Required";
//   }

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   if (!values.channel) {
//     errors.channel = "Required";
//   }
//   return errors;
// };

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
  address: Yup.string().required("Required"),
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required!";
  }
  return error;
};
function YouTubeForm() {
  const [formValues, setFormValues] = useState(null);
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">YouTube Form</h1>
      <Formik
        initialValues={formValues || initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        // validateOnMount
        enableReinitialize
      >
        {(formik) => {
          console.log(formik);
          return (
            <Form className="max-w-sm">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="name"
                  name="name"
                />

                <ErrorMessage name="name" component={TextError} />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  id="email"
                  name="email"
                />
                <ErrorMessage name="email">
                  {(ErrorMessage) => (
                    <div className="text-red">{ErrorMessage}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="channel"
                >
                  Channel:
                </label>
                <Field
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="channel"
                  name="channel"
                />
                <ErrorMessage name="channel" component={TextError} />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="comments"
                >
                  Comments:
                </label>
                <Field
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="comments"
                  name="comments"
                  placeholder="comments"
                  as="textarea"
                  validate={validateComments}
                />
                <ErrorMessage name="comments" component={TextError} />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="address"
                >
                  Address:
                </label>
                <Field
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="address"
                  placeholder="address"
                >
                  {(props) => {
                    const { field, form, meta } = props;
                    return (
                      <div>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="address"
                          {...field}
                        />
                        {meta.touched && meta.error ? (
                          <div>{meta.error}</div>
                        ) : null}
                      </div>
                    );
                  }}
                </Field>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="facebook"
                >
                  Facebook Profile
                </label>
                <Field
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="facebook"
                  name="social.facebook"
                  placeholder="facebook"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="twitter"
                >
                  Twitter Profile
                </label>
                <Field
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="twitter"
                  name="social.twitter"
                  placeholder="twitter"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="primaryPh"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Primary phone number
                </label>
                <Field
                  type="text"
                  id="primaryPh"
                  name="phone[0]"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="secondaryPh"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Secondary phone number
                </label>
                <Field
                  type="text"
                  id="secondaryPh"
                  name="phone[1]"
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  List of Phone No.
                </label>
                <FieldArray name="phNumbers">
                  {(fieldArrayProps) => {
                    const { push, remove, form } = fieldArrayProps;
                    const { values } = form;
                    const { phNumbers } = values;
                    console.log("Form Errors", form.errors);
                    return (
                      <div>
                        {phNumbers.map((phNumber, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                          >
                            <Field
                              name={`phNumbers[${index}]`}
                              className="mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            {index > 0 && (
                              <button
                                className="border border-black text-lg pl-3 pr-3 ml-2 mt-1"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          className="border border-black text-lg pl-2 pr-2"
                          onClick={() => push("")}
                        >
                          +
                        </button>
                      </div>
                    );
                  }}
                </FieldArray>
              </div>

              <button
                type="button"
                className="bg-black p-3 rounded text-white m-1"
                onClick={()=>{setFormValues(savedValues)}}
              >
                Load saved data
              </button>
              <button
                type="reset"
                className="bg-black p-3 rounded text-white m-3"
              >
                Reset
              </button>
              <button
                className={`bg-black p-3 rounded text-white ${
                  !formik.isValid || formik.isSubmitting ? "bg-grey" : ""
                }`}
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit
              </button>

              {/* <button
                className="bg-black p-3 rounded text-white m-3"
                onClick={() => formik.validateField("comments")}
                type="button"
              >
                Validate Comments
              </button>

              <button
                className="bg-black p-3 rounded text-white m-3"
                onClick={() => formik.validateForm()}
                type="button"
              >
                Validate All
              </button>

              <button
                className="bg-black p-3 rounded text-white m-3"
                type="button"
                onClick={() => formik.setFieldTouched("comments")}
              >
                Visit Comments
              </button>

              <button
                className="bg-black p-3 rounded text-white m-3"
                type="button"
                onClick={() =>
                  formik.setTouched({
                    name: true,
                    email: true,
                    channel: true,
                    comments: true,
                  })
                }
              >
                Visit All
              </button> */}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default YouTubeForm;
