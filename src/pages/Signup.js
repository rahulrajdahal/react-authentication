import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import MapContainer from "../components/MapContainer";
import * as Yup from "yup";
import { routes } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Api from "../app/api";
import { InfoWindow, Map, Marker } from "google-maps-react";
import PlacesAutocomplete from "react-places-autocomplete";

function Signup() {
  const api = new Api();
  const { addToast } = useToasts();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    name: Yup.string().required("Required").min(3, "Too short"),
    password: Yup.string()
      .min(6)
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
      .required("Required"),
  });
  const [value, setValue] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      dob: "",
      location: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await api.regiser(values);
        addToast("Signup Successful.", {
          appearance: "success",
          autoDismiss: true,
        });
        navigate(routes.login);
      } catch (error) {
        addToast(error.toString(), {
          appearance: "error",
          autoDismiss: true,
        });
      }
    },
  });
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen md:flex">
      <form
        className="xl:ml-60 flex flex-col gap-11 px-10 lg:w-1/3 border-2 py-6 rounded-md"
        onSubmit={formik.handleSubmit}
      >
        <h3 className="text-5xl">Signup</h3>
        <Input
          name="name"
          label="Name"
          placeholder="John Doe"
          onChange={formik.handleChange}
          error={
            formik.touched.name && formik.errors.name ? formik.errors.name : ""
          }
        />
        <Input
          name="email"
          label="Email"
          placeholder="john@doe.com"
          onChange={formik.handleChange}
          type="email"
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""
          }
        />
        <Input
          name="password"
          label="Password"
          placeholder="********"
          onChange={formik.handleChange}
          type="password"
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
        />
        <Input
          name="dob"
          label="Date of Birth"
          onChange={formik.handleChange}
          type="date"
        />
        <Input
          name="location"
          label="Location"
          placeholder="Glenwood, IL"
          onChange={formik.handleChange}
        />
        <PlacesAutocomplete value={value} onChange={(value) => setValue(value)}>
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="autocomplete-container">
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Button text="Signup" />

        <div className="flex items-center gap-0">
          <p>Already Have an Account?</p>
          <Button
            text="Login"
            type="text"
            customClass="w-auto"
            onClick={() => navigate(routes.login)}
          />
        </div>
      </form>
      <MapContainer lat={41.9214} lng={-88.0078} />
    </div>
  );
}

export default Signup;
