// UpdateEventForm.js
import React, { useState, useEffect } from 'react';
// import './UpdateEvent.css';
// import AdminNavbar from '../../AdminNavbar/AdminNavbar';
// import AdminSidebar from '../../AdminSidebar/AdminSidebar';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateEventForm = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    location: '',
    poster: '',
    attendees: [''],
    description: '',
    category: '',
    price: 0,
  });

  useEffect(() => {
    const fetchEventData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/event/${eventId}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        setEventData(res.data.event);
      } catch (error) {
        toast.error('Failed to fetch event data');
      }
    };
    fetchEventData();
  }, [eventId]);

  const handleAddAttendee = () => {
    if (eventData.attendees.length < 3) {
      setEventData((prevData) => ({
        ...prevData,
        attendees: [...prevData.attendees, ''],
      }));
    } else {
      toast.error('You can add a maximum of 3 artists.');
    }
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendees = [...eventData.attendees];
    updatedAttendees.splice(index, 1);
    setEventData((prevData) => ({
      ...prevData,
      attendees: updatedAttendees,
    }));
  };

  const handleArtistChange = (index, value) => {
    const updatedAttendees = [...eventData.attendees];
    updatedAttendees[index] = value;
    setEventData((prevData) => ({
      ...prevData,
      attendees: updatedAttendees,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/updateEvent/${eventId}`,
        eventData,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.msg === 'success') {
        toast.success('Event Updated Successfully');
      }
    } catch (error) {
      toast.error('Failed to update event');
    }
    console.log('Form submitted!', eventData);
  };

  return (
    <>
    
      <div className="event-form-container">
        <form className="event-form">
          <div className="grid-container">
            <div className="left-column">
              <div className="form-row">
                <label className="form-label">Title:</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  value={eventData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Date:</label>
                <input
                  type="date"
                  name="date"
                  className="form-input"
                  value={eventData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Location:</label>
                <input
                  type="text"
                  name="location"
                  className="form-input"
                  value={eventData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Poster URL:</label>
                <input
                  type="text"
                  name="poster"
                  className="form-input"
                  value={eventData.poster}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="right-column">
              <div className="form-row artist-container">
                <label className="form-label">Artist:</label>
                {eventData.attendees.map((attendee, index) => (
                  <div key={index} className="attendee-input-row ">
                    <div
                      className="add-remove-btn btn"
                      onClick={handleAddAttendee}
                    >
                      +
                    </div>
                    <input
                      type="text"
                      className="form-input artist-input"
                      value={attendee}
                      onChange={(e) =>
                        handleArtistChange(index, e.target.value)
                      }
                      placeholder={`Attendee ${index + 1}`}
                      required
                    />
                    {eventData.attendees.length > 1 && (
                      <div
                        className="add-remove-btn  btn"
                        onClick={() => handleRemoveAttendee(index)}
                      >
                        -
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="form-row">
                <label className="form-label">Description:</label>
                <input
                  name="description"
                  className="form-input description-input"
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Category:</label>
                <input
                  type="text"
                  name="category"
                  className="form-input"
                  value={eventData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Price:</label>
                <input
                  type="number"
                  name="price"
                  className="form-input"
                  value={eventData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="btn-container">
            <button
              className="btn submit-btn"
              onClick={(e) => handleUpdateEvent(e)}
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEventForm;
