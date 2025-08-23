import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-green-50 to-emerald-100">
      <div className="bg-white border border-green-200 rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-800 border-b pb-3 border-green-300">
          Welcome Back to the Hills
        </h2>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
