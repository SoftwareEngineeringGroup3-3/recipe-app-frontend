import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./styles.css";
import { useContext, useState } from "react";
import { apiUrl } from "../../api";
import { setCookie } from "../../cookie";
import { SessionContext, Session, UserSession } from "../../session";
import useEffect from "react";
import { sha256 } from "js-sha256";

//TODO: wstepna walidacja pól register na froncie | wyswietanie diva z potwierdzeniem rejestracji lub bledu

function LoginRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const { session, setSession } = useContext(SessionContext);
  let navigate = useHistory();

  function submitLogin(ev) {
    ev.preventDefault();

    const hashedPassword = sha256(password);

    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: hashedPassword }),
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (data.error) {
              setError(data.message);
            } else {
              setCookie(
                "security_header",
                data.security_header,
                1000 * 3600 * 2
              ); //expires after 2 hours
              setCookie(
                "admin_credentials",
                data.user.user_is_admin,
                1000 * 3600 * 2
              );
              setSession(new UserSession(data.security_header));
              navigate.push("/start");
            }
          })
          .catch((error) => {
            console.error(error);
            setError("Invalid server response");
          });
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to connect, try again later");
      });
  }

  function submitRegister(ev) {
    ev.preventDefault();

    const hashedPassword = sha256(password);
    const hashedRepPassword = sha256(repPassword);

    fetch(`${apiUrl}/registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: hashedPassword,
        repPassword: hashedRepPassword,
        email: email,
      }),
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (data.error) {
              setError(data.message);
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error(error);
            setError("Invalid server response");
          });
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to connect, try again later");
      });
  }

  function switchers() {
    var switchers = [...document.querySelectorAll(".switcher")];
    switchers.forEach((item) => {
      item.addEventListener("click", function () {
        switchers.forEach((item) =>
          item.parentElement.classList.remove("is-active")
        );
        this.parentElement.classList.add("is-active");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    switchers();
  });

  return (
    <div className="login-body">
      <section className="forms-section">
        <div className="forms">
          <div className="form-wrapper is-active">
            <button type="button" className="switcher switcher-login">
              Login
              <span className="underline"></span>
            </button>
            <form className="formPanel form-login" onSubmit={submitLogin}>
              <fieldset>
                <legend>
                  Please, enter your email and password for login.
                </legend>
                <div className="input-block">
                  <label htmlFor="login-username">Username</label>
                  <input
                    id="login-username"
                    type="text"
                    required
                    onInput={(ev) => {
                      setUsername(ev.target.value);
                    }}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    onInput={(ev) => {
                      setPassword(ev.target.value);
                    }}
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn-login" onClick={switchers}>
                Login
              </button>
            </form>
          </div>
          <div className="form-wrapper">
            <button
              type="button"
              className="switcher switcher-signup"
              onClick={switchers}
            >
              Sign Up
              <span className="underline"></span>
            </button>
            <form className="formPanel form-signup" onSubmit={submitRegister}>
              <fieldset>
                <legend>
                  Please, enter your email, password and password confirmation
                  for sign up.
                </legend>
                <div className="input-block">
                  <label htmlFor="signup-username">Username</label>
                  <input
                    id="signup-username"
                    type="text"
                    required
                    onInput={(ev) => {
                      setUsername(ev.target.value);
                    }}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-email">E-mail</label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    onInput={(ev) => {
                      setEmail(ev.target.value);
                    }}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    onInput={(ev) => {
                      setPassword(ev.target.value);
                    }}
                  />
                </div>
                <div className="input-block">
                  <label htmlFor="signup-password-confirm">
                    Confirm password
                  </label>
                  <input
                    id="signup-password-confirm"
                    type="password"
                    required
                    onInput={(ev) => {
                      setRepPassword(ev.target.value);
                    }}
                  />
                </div>
              </fieldset>
              <button type="submit" className="btn-signup">
                Register
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginRegister;
