import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import styles from "./ContactForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function ContactForm() {
  const [state, handleSubmit] = useForm("xvonznew");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <form className={cx("inbox")} onSubmit={handleSubmit}>
      <label className={cx("text-email")} htmlFor="email">
        Email Address:
      </label>
      <div className={cx("form")}>
        <input className={cx("email")} id="email" type="email" name="email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea className={cx("mess")} id="message" name="message" />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <button
          className={cx("btn-submit")}
          type="submit"
          disabled={state.submitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default ContactForm;
