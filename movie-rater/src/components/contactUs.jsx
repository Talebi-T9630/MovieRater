import React from "react";
import ReactDOM from "react-dom";
import emailjs from 'emailjs-com';


class ContactUs extends React.Component {

  constructor(props) {
    super(props);

    // Defining all states
    this.state = {
      name: '',
      nameError: false,
      contact: '',
      email: '',
      emailError: false,
      emailError2: false,
      message: '',
      messageError: false,
      formValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //email proper formatting
  isValidEmail(email) {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  }

  //Handles change by setting the state for each name 
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Check for error messages and resturns true or false
  // 
  handleSubmit(e) {
    const { name, email, message, nameError, emailError, emailError2, messageError } = this.state;

    this.setState({ nameError: name ? false : true });
    this.setState({ messageError: message ? false : true });
    this.setState({ emailError: email ? false : true });
    //if email exists check valie email format 
    if (email && !emailError) { this.setState({ emailError2: this.isValidEmail(email) ? false : true }); }

    //if all values are filled, set true and submit else there is a problem with the form
    if (name && email && message && !nameError && !emailError && !emailError2 && !messageError) {
      this.setState({ formValid: true });
      emailjs.sendForm('service_ez7gn0d', 'template_720o9oq', e.target, 'user_g8xe7t0mVyHp3qPILMpIo')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error);
        });
    } else {
      this.setState({ formValid: false });
    }

    e.preventDefault();
      
  }

  render() {
    //Initiating this.state at the top to refrain from repetitions
    const { name, email, message, nameError, emailError, emailError2, messageError, formValid } = this.state;
    /*check if form is valid or not
    if not valid show error message where it should be
    if is valid submit form */
    if (!formValid) {
      return (
        <div style={{ backgroundColor: "#c4d4cb" }}>
          <div style={{ backgroundColor: "#c4d4cb", color: "Black" }}>
        <marquee behavior="scroll" direction="left"><h2></h2></marquee>
          <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
            <div className="card-header bg-transparent border-0 text-center text-uppercase">
              <h3>Contact Us</h3>
            </div>
            <div className="card-body">
              <form action="/" onSubmit={(e) => this.handleSubmit(e)} encType="multipart/form-data">
                <div className="form-group">
                  <label className="mb-0">Your name
                    <span className="text-danger">*</span>
                  </label>
                  <input name="name" type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                  {nameError
                    ? <div className="alert alert-danger mt-2">Name is a required field.</div>
                    : ''
                  }
                </div>
                <div className="form-group">
                  <label className="mb-0">Your email<span className="text-danger">*</span></label>
                  <input name="email" type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                  {emailError
                    ? <div className="alert alert-danger mt-2">Email is a required field.</div>
                    : ''
                  }
                  {emailError2
                    ? <div className="alert alert-danger mt-2">Email invalid.</div>
                    : ''
                  }
                </div>
                <div className="form-group">
                  <label className="mb-0">Your contact number (Optional)</label>
                  <input name="contact" type="text" className="form-control" placeholder="Contact" onChange={this.handleChange} value={this.state.contact} />
                </div>
                <div className="form-group">
                  <label className="mb-0">Message<span className="text-danger">*</span></label>
                  <textarea name="message" type="text" className="form-control" placeholder="Message" value={this.state.message} onChange={this.handleChange} />
                  {messageError
                    ? <div className="alert alert-danger mt-2">Message is a required field.</div>
                    : ''
                  }
                </div>
                <p className="text-center mb-0"><input type="submit" className="btn btn-primary btn-lg w-100 text-uppercase" value="Submit Now" /></p>
              </form>

            </div>
          </div>
          </div>
        </div>
      );
    } //If form information is valid, post to the main page showing a gratitude message 
    else {
      return (
        <div className="thankyou_details">
          <div className="alert alert-success mt-3">Mail sent successfully.</div>
        </div>
      )
    }
  }
}

ReactDOM.render(
  <ContactUs title="Contact Form" />,
  document.getElementById('root')
);

export default ContactUs;
