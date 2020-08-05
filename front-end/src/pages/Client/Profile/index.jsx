import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../context";
import { FormGroup, Header, Message, SubmitButton } from "../../../components";
import Form from "react-bootstrap/Form";
import { getUser, handleSubmit } from "./service";
import "./style.css";

const Profile = () => {
  const { message, setMessage } = useContext(Context);

  const [email, setEmail] = useState({ value: null, error: null });

  const [name, setName] = useState({ value: null, error: null });

  const body = { name: name.value, email: email.value };

  const isDisabled = !email.value || email.error || !name.value || name.error;

  useEffect(() => {
    getUser().then(({ data, error }) => {
      setName({ value: data.name });
      setEmail({ value: data.email });
      error &&
        setMessage({ value: error.message || error.status, type: "ALERT" });
    });
  }, []);

  return (
    <div className="profile_page">
      <Header title="Meu perfil" />
      <Message infinity />
      <Form>
        <FormGroup
          state={name}
          callback={setName}
          field="name"
          testId="profile-name-input"
          defaultValue={name.value}
        />
        <FormGroup
          callback={setEmail}
          field="email"
          state={email}
          testId="profile-email-input"
          defaultValue={email.value}
        />
        <SubmitButton
          body={body}
          isDisabled={isDisabled}
          handleSubmit={handleSubmit}
          label="Save"
          testId="signin-btn"
        />
      </Form>
    </div>
  );
};

export default Profile;
