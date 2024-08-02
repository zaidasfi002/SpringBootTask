import axios from "axios";
import React, { useState } from "react";

interface FormState {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [msg, setmsg] = useState("");
  // State for form fields
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  // State for form validation errors
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
  });

  // Handler to update form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors = {
      name: "",
      email: "",
      password: "",
    };

    // Validate name
    if (formState.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formState.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate password
    if (formState.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/register",
          formState
        );
        console.log(response.data);
        console.log("Form submitted successfully:", formState);
        setmsg("Regiter Successfully");
        // Reset form
        setFormState({
          name: "",
          email: "",
          password: "",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-gray-400 border-solid border-4 border-black max-h-screen mt-6 p-5 mx-80 rounded-lg text-center">
      <h1 className="mb-6 text-4xl font-bold">Registration Form</h1>
      <span className="text-green-900">{msg}</span>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div>
          <label className="p-4 text-xl font-semibold " htmlFor="name">
            Name
          </label>
          <input
            className="mb-3 h-10 rounded-md p-3 w-96"
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div className="mt-3 rounded-md">
          <label className="p-4 text-xl font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="mb-3 h-10 rounded-md p-3 w-96"
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Enter your mail"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div className="mt-3">
          <label className="p-4 text-xl font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="mb-3 h-10 rounded-md p-3 w-96"
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button className="mt-3 bg-blue-400 p-2 rounded-md" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
