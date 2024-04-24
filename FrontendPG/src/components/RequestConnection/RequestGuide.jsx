import React, { useEffect, useState } from "react";
import "./RequestGuide.css";
import img1 from "../../assests/techo-home.png";
import axios from "axios";

const RequestGuide = () => {
    const [submitMessage, setSubmitMessage] = useState('');
    const [successGuide, setSuccessGuide] = useState('');
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        fetchGuides();
    }, []);

    const fetchGuides = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/guide');

            const updatedGuides = await Promise.all(response.data.map(async (guide) => {
                const guideStatus = await axios.get(`http://localhost:8080/checkAvailability/checkfor/${guide.guideId}`);
                const availability = guideStatus.data;
                return { ...guide, status: availability };
            }));

            setGuides(updatedGuides);
        } catch (error) {
            console.error('Error fetching guides:', error);
        }
    };


    const handleRequest = async (e, gid) => {
        e.preventDefault();
        try {
            const stdid = "660d6064d7d9702a3b6d8851";

            const rdf = await axios.get(`http://localhost:8080/rdfActions/getrdf/from/${stdid}`);
            const rdfresponse = rdf.data;

            const requestBody = {
                ReqStudent: stdid,
                RdfId: rdfresponse,
                ReqGuide: gid
            };

            await axios.post(`http://localhost:8080/requestConnection/addReqBy/${stdid}/with/${rdfresponse}/to/${gid}`, requestBody);
            console.log("Request Sent");
            setSubmitMessage("Request Sent Successfully");
            setSuccessGuide(gid); // Set the guide for which the request was sent successfully
        } catch (error) {
            console.error('Error while handling request:', error);
        }
    };

    return (
        <div className="rg-main-bg">
            <h3 className="rg-heading">Explore Guides for your Dissertation</h3>
            <hr />
            <div className="rg-back-div">
                {guides.map(guide => (
                    <div className="rg-card" key={guide.guideId}>
                        <div className="rg-divider">
                            <img src={img1} alt="name" className="rg-dp" />
                        </div>
                        <div>
                            <h4 className="rg-name">{guide.name}</h4>
                            <p className="rg-name">{guide.areaOfSpecialization}</p>
                            <p className="rg-name">Status: {guide.status}</p>
                            <div className="rg-buttonCont">

                                <button className="rg-btn" id="rg-guide-details">Details</button>
                                {guide.status !== "Occupied" && (
                                    <button className="rg-btn" id="rg-guide-connect" onClick={(e) => handleRequest(e, guide.guideId)}>Connect</button>
                                )}
                                {guide.status === "Occupied" && (
                                    <button className="rg-btn-disabled" id="rg-guide-connect" disabled>Connect</button>
                                )}
                            </div>
                            <div>
                            
                            {successGuide === guide.guideId && (
                                    <div className="alert alert-success mt-3" role="alert">
                                        {submitMessage}
                                    </div>
                                )}
                        </div>
                    </div>
                    </div>
                ))}
        </div>
        </div>
    );
};

export default RequestGuide;
