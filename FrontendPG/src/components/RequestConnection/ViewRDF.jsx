import React, { useState, useEffect } from "react";
import "./ViewRDF.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewRDF = () => {
  const [details, setDetails] = useState({});

  const { stdid } = useParams();

console.log(stdid);
  useEffect(() => {
  console.log("Hoja na yaar");
    fetchDetails();
  }, [stdid]);

//   const stdid = "660d6064d7d9702a3b6d8851";

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rdfActions/viewrdf/${stdid}`
      );
      if (response.status === 200) {
      console.log("dekho mein aa gaya");
        console.log(response.data);

        const std = await axios.get(
          `http://localhost:8080/api/auth/student/givenamebranch/${stdid}`
        );
        console.log(std.data);

        setDetails({
          ...response.data,
          stdname: std.data.name,
          branch: std.data.branch,
        });
      } else if (response.status === 404) {
        console.log(response.data);
        setDetails(null); // or set empty object based on your requirements
      }
    } catch (error) {
      console.log("Error while fetching details:", error);
    }
  };

  return (
    <div className="vdf-main-bg">
      <div className="vdf-card">
        <h2>Dissertation Details</h2>
        <hr />

        <div className="vdf-content">
          <label className="vdf-label">Student Name: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
            value={details.stdname || ""}
          />
          <label className="vdf-label">Branch: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
            value={details.branch || ""}
          />
          <label className="vdf-label">Dissertation Name: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
            value={details.dissertationName || ""}
          />
          <label className="vdf-label">Dissertation Description: </label>
          <textarea
            className="form-control vdf-input"
            readOnly
            value={details.dissertationDesc || ""}
          />
          <label className="vdf-label">Latest Result: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
            value={details.stdResult || ""}
          />
          <label className="vdf-label">Qualification: </label>
          <input
            type="text"
            className="form-control vdf-input"
            readOnly
            value={details.qualification || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewRDF;
