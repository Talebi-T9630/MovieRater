import React from "react";
import { useState } from "react";

function ContactUs() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const email = event.target.value;
    const message = event.target.value;

    setInputs(values => ({ ...values, ['name']: name, ['email']: email, ['message']: message }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // send the info to mangoDB
    console.log(inputs);
  }

  return (
    <div>
      <h3>Contact Us..</h3>
      <form onSubmit={handleSubmit}>
        `<div class="form-group row">
          <label for="colFormLabel" class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <input
              type="input"
              class="form-control"
              name="name"
              id="colFormLabel"
              placeholder="write your name"
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="colFormLabel" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              name="email"
              id="colFormLabel"
              placeholder="write your email"
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="colFormLabel" class="col-sm-2 col-form-label">message</label>
          <div class="col-sm-10">
            <textarea
              rows="4"
              cols="50"
              class="form-control"
              id="colFormLabel"
              name="message"
              placeholder="Write your message"
            />

            <input className="btn btn-primary" type="submit" />

          </div>

        </div>`
      </form>
    </div>
  )
}
export default ContactUs;