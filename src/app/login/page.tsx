"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import "../styles/auth.css";

export default function LoginPage() {
  // useState for input data
  const [authDetails, setAuthDetails] = useState({
    email: "",
    password: "",
  });

  // useState for form submit or not
  const [submit, setSubmit] = useState<boolean>(false);

  // Router
  const router = useRouter();

  // onSubmit data send to api
  const formHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    try {
      await axios.post("/api/login", authDetails);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
      setSubmit(false);
    }
  };

  // Test user login details
  const testUser = () => {
    setAuthDetails({
      email: "test@gmail.com",
      password: "Test12345",
    });
  };

  return (
    <div className="loginPage authPage">
      <form onSubmit={formHandler}>
        <h1>Log In</h1>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={authDetails.email}
          onChange={(e) =>
            // Add email data in auth useState
            setAuthDetails({ ...authDetails, email: e.target.value })
          }
          required
          autoComplete="off"
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={authDetails.password}
          onChange={(e) =>
            // Add password data in auth useState
            setAuthDetails({ ...authDetails, password: e.target.value })
          }
          required
          autoComplete="off"
        />

        {/* Change text based on form submit state true or false */}
        <button disabled={submit} type="submit">
          {submit ? "Wait" : "Login"}
        </button>

        {/* Add test user data in input filds */}
        <button type="button" onClick={testUser}>
          Test User
        </button>

        <Link href={"/signup"}>Signup Page</Link>
      </form>
    </div>
  );
}
