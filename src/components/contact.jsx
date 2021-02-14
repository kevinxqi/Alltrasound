import React, { Component, useState } from "react";
import validator from "email-validator";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import{ init } from 'emailjs-com';

const Contact = (props) => {
  init("user_srteJNpy4SOY0RWaWOXsm");

  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const clearForm = () => {
    setValues({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const sendEmail = () => {
    // setLoading(true);
    let validEmail = validator.validate(values.email);
    if (
      values.name.length > 0 &&
      values.message.length > 0 &&
      values.email.length > 0
    ) {
      if (!validEmail) {
        // setLoading(false);
        toast.error("Please enter a valid email!");
      } else {
        let template_params = {
          reply_to: values.email,
          subject: values.subject,
          from_name: values.name,
          message_html: values.message,
        };

        let service_id = "service_g2oei78";
        let template_id = "alltrasound_website_form";
        let user_id = "user_srteJNpy4SOY0RWaWOXsm";
        emailjs
          .send(service_id, template_id, template_params, user_id)
          .then(() => {
            toast.success("Your message was sent, thank you!");
            clearForm();
            //setLoading(false);
          })
          .catch(() => {
            toast.error("Something went wrong. Please try again later");
            //setLoading(false);
          });
      }
    } else {
      toast.error("Please complete all fields.");
      //setLoading(false);
    }
  }

 
    return (
      <div>
         <ToastContainer />
        <div id="contact">
          <div className="container">
            <div className="col-md-8">
              <div className="row">
                <div className="section-title">
                  <h2>Get In Touch</h2>
                  <p>
                    Please fill out the form below to send us an email and we will get back to you as soon as possible.
                  </p>
                </div>
                <form
                  name="sentMessage"
                  id="contactForm"
                  onSubmit={(e) => (e.preventDefault())}
                  noValidate
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          value={values.name}
                          className="form-control"
                          placeholder="Name"
                          required="required"
                          onChange={handleChange("name")}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          value={values.email}
                          className="form-control"
                          placeholder="Email"
                          required="required"
                          onChange={handleChange("email")}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="subject"
                      value={values.subject}
                      className="form-control"
                      placeholder="Subject"
                      required="required"
                      onChange={handleChange("subject")}
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      value={values.message}
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                      onChange={handleChange("message")}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button onClick={sendEmail} className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                  <a href="tel:210-245-9879" style={{ color: "white" }}>
                    {" "}
                    <u>{props.data ? props.data.phone : "loading"}</u>
                  </a>
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o"></i> Email
                  </span>{" "}
                  <a
                    href="mailto:info@alltrasound.com"
                    style={{ color: "white" }}
                  >
                    <u>{props.data ? props.data.email : "loading"}</u>
                  </a>
                </p>
              </div>
            </div>

            {/*--------------------- Social Media -----------------------
            <div className="col-md-12">
              <div className="row">
                <div className="social">
                  <ul>
                    <li>
                      <a
                        href={.props.data ? .props.data.facebook : "/"}
                      >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href={.props.data ? .props.data.twitter : "/"}>
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href={props.data ? props.data.youtube : "/"}>
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div id="footer">
          <div className="container text-center">
            <p>ALLtrasound &copy; 2021</p>
          </div>
        </div>
      </div>
    );
  }

export default Contact;
