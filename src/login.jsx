import "./Login.css"

export default function Login() {
    return (
        <>
            <div className="welcome">
                
                    <h1 id="title">
                        Welcome To Health Clinic
                    </h1>
                
            </div>

            <div className="form_container">
                <form>
                    <div className="user_div">
                        <label htmlFor="user_field" style={{ color: "white" }}>
                            Username
                        </label>
                        <input id="user_field" type="text" />
                    </div>

                    <div className="pass_div">
                        <label htmlFor="pass_field" style={{ color: "white" }}>
                            Password
                        </label>
                        <input id="pass_field" type="password" />
                    </div>

                    <div className="submit_btn" style={{ backgroundColor: "aqua" }}>
                        <input type="button" id="submit" value="Submit" />
                    </div>

                    <div className="msg">
                        <p>
                            Haven't an account?{" "}
                            <a href="/" style={{ color: "white" }}>
                                Register now
                            </a>
                        </p>
                    </div>
                </form>
            </div>
            <div className="fakebody"> . </div>
        </>
    );
}
