import "./register.css";
import "./bootstrap.min.css";

export default function Register() {
  return (
    <>
      <div className="Register">
        <form>
          <input 
            type="text" 
            placeholder="Username" 
            className="input1" 
            id="user_name" 
          />

          <input 
            type="password" 
            placeholder="Password" 
            className="input1" 
            id="pass" 
          />

          <input 
            type="email" 
            placeholder="Email" 
            className="input1" 
            id="email" 
          />

          <input 
            type="tel" 
            placeholder="Phone number"
            className="input1" 
            id="tel" 
          />

          <input 
            type="button" 
            value="Register"
            className="btn"
            id="btn" 
          />
        </form>
      </div>
        <div className="fakebody">.</div>
    </>
  );
}
