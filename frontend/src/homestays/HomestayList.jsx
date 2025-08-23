//for owner purpose not public page -> for public uses we built new PublicHomestays.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllHomestays,
  deleteExistingHomestay,
} from "../features/homestays/homestaySlice";

import { useNavigate } from "react-router-dom";
import HomestayCard from "./HomestayCard";
import Loader from "../components/Loader";
import useAuth from "../hooks/useAuth";

const HomestayList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const { homestays, loading, error } = useSelector((state) => state.homestays);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllHomestays(token));
    }
  }, [dispatch, token]);

  const handleViewDetails = (id) => {
    navigate(`/homestays/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/homestays/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this homestay?")) {
      try {
        await dispatch(deleteExistingHomestay({ id, token })).unwrap();
        alert("Homestay deleted successfully.");
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-6">
        {error || "Failed to load homestays"}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">All Homestays</h1>

      {homestays.length === 0 ? (
        <p className="text-gray-400">No homestays found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homestays.map((homestay) => (
            <HomestayCard
              key={homestay._id}
              homestay={homestay}
              onViewDetails={handleViewDetails}
              onEdit={
                user &&
                (user.role === "admin" || user._id === homestay.owner) &&
                handleEdit
              }
              onDelete={
                user &&
                (user.role === "admin" || user._id === homestay.owner) &&
                handleDelete
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomestayList;
