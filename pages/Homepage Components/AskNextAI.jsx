import React, { useState } from "react";
import { useRef } from "react";
import { useFormik } from "formik";

function AskNextAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const submitHandler = async (values) => {
    setIsLoading(true);
    const AIPrompt = values.AIPrompt;
    try {
      const response = await fetch("/api/askAI", {
        method: "POST",
        body: JSON.stringify(AIPrompt),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        alert("Error Occured");
      }
      if (response.ok) {
        setIsLoading(false);
        const responseData = await response.json();
        setData(responseData);
        isLoading = false;
      }
    } catch (err) {}
  };
  const formik = useFormik({
    initialValues: {
      AIPrompt: "",
    },
    onSubmit: submitHandler,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center">
        <input
          className="w-1/2 px-2 py-4 my-3 bg-white border rounded-lg"
          type="text"
          name="AIPrompt"
          onChange={formik.handleChange}
          placeholder="ASK AI"
          value={formik.values.AIPrompt}
        />
        <button
          type="submit"
          className="px-2 py-4 bg-gray-900 rounded-lg mx-2 text-white"
        >
          Enter
        </button>
        {isLoading && <span className="loading loading-bars loading-xs"></span>}
      </div>
      {data && (
        <div className="text-black text-center w-[80%] mx-auto shadow-md rounded-lg p-4 my-2">
          {data.message}
        </div>
      )}
    </form>
  );
}

export default AskNextAI;
