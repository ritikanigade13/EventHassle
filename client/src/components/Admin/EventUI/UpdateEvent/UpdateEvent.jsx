// DeleteEventForm.js
import React, { useEffect, useState } from "react";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import AdminSidebar from "../../AdminSidebar/AdminSidebar";
import toast from "react-hot-toast";
import axios from "axios";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import MoviePoster from "../../../components/MoviePoster/MoviePoster";
import UpdateEventForm from "./UpdateEventForm";

const pageLimit = 10;
const UpdateEvent = () => {
  const [events, setEvents] = useState([]);
  const [showUpdateEventForm, setUpdateEventForm]= useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    poster: "",
    attendees: [""],
    description: "",
    category: "",
    price: 0,
  });
  

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/getEvents`,
        { pageLimit, page: 1 }
      );
      setEvents(data.events);
    };
    fetchEvent();
  }, [events]);
  

  const handleUpdateEvent = async (title) => {
    const accessToken = localStorage.getItem("accessToken");
    setUpdateEventForm(true)
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/getEventDetails/${title}`);       
        
    } catch (error) {
        
    }







    
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className="event-form-container">
        {showUpdateEventForm && <UpdateEventForm />}
        <div className="event-form">
          {events.map((event, index) => (
            <div
              className="event-name-box"
              key={index}
              onClick={(e) => handleUpdateEvent(event.title)}
            >
              <div className="event-name-poster">
                <MoviePoster poster={event.poster} width={"50px"} />
                <div className="event-name">{event.title}</div>
              </div>
              <div
                className="event-deleteicon"
                onClick={(e) => handleUpdateEvent(event.title)}
              >
                <DeleteOutlineRoundedIcon sx={{ fontSize: 20 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpdateEvent;
