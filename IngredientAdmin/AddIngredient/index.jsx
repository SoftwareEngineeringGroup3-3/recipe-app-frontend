import React from 'react';
import styles from './styles.css'




function AddingIngredient() {
  return (
    <section className="forms-section" >
  <div className="forms">
    <div className="form-wrapper is-active">
      <button type="button" className="switcher switcher-login">
        Login
        <span className="underline"></span>
      </button>
      <form className="formPanel form-login" onSubmit={submitLogin}>
        <fieldset>
          <legend>Please, enter your email and password for login.</legend>
          <div className="input-block">
            <label htmlFor="login-username">Username</label>
            <input id="login-username" type="text" required onInput={(ev) => { setUsername(ev.target.value); }}/>
          </div>
          <div className="input-block">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" type="password" required onInput={(ev) => { setPassword(ev.target.value); }}/>
          </div>
        </fieldset>
        <button type="submit" className="btn-login" onClick={switchers}>Login</button>
      </form>
    </div>
    <div className="form-wrapper">
      <button type="button" className="switcher switcher-signup"  onClick={switchers}>
        Sign Up
        <span className="underline"></span>
      </button>
       <form className="formPanel form-signup"  onSubmit={submitRegister}> 
        <fieldset>
          <legend>Please, enter your email, password and password confirmation for sign up.</legend>
          <div className="input-block">
            <label htmlFor="signup-username">Username</label>
            <input id="signup-username" type="text" required onInput={(ev) => { setUsername(ev.target.value); }}/>
          </div>
          <div className="input-block">
            <label htmlFor="signup-email">E-mail</label>
            <input id="signup-email" type="email" required onInput={(ev) => { setEmail(ev.target.value); }}/>
          </div>
          <div className="input-block">
            <label htmlFor="signup-password">Password</label>
            <input id="signup-password" type="password" required onInput={(ev) => { setPassword(ev.target.value); }}/>
          </div>
          <div className="input-block">
            <label htmlFor="signup-password-confirm">Confirm password</label>
            <input id="signup-password-confirm" type="password" required onInput={(ev) => { setRepPassword(ev.target.value); }}/>
          </div>
        </fieldset>
        <button type="submit" className="btn-signup">Register</button>
      </form>
    </div>
  </div>
</section>
  )
}

export default AddingIngredient