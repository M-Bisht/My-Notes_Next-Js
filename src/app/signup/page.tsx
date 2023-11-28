"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import "../styles/auth.css";

export default function SignupPage() {
  // useState for input data
  const [authDetails, setAuthDetails] = useState({
    name: "",
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
      axios.post("/api/signup", authDetails);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
      setSubmit(false);
    }
  };

  return (
    <div className="signupPage authPage">
      <form onSubmit={formHandler}>
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          id="name"
          name="name"
          value={authDetails.name}
          onChange={(e) =>
            // Add name data in auth useState
            setAuthDetails({ ...authDetails, name: e.target.value })
          }
          required
          autoComplete="off"
        />

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
          {submit ? "Wait" : "Signup"}
        </button>

        <Link href={"/login"}>Login Page</Link>
      </form>
    </div>
  );
}
