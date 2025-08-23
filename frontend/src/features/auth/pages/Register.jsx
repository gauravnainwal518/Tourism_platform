import React from "react";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f0f4f1] to-[#e6f2ea]">
      <div className="w-full max-w-md shadow-xl border border-[#cfe1d4] rounded-2xl p-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#2f5d3f] mb-6">
          Register to Explore Uttarakhand
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
