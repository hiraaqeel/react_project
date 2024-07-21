
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const navigate = useNavigate();
    // const auth = getAuth();

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleSignUp(){
        if(!email ||!password) return;
        createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) =>{
            const user = userCredential.user;
            console.log(user);
            navigate('/private'); 
        })
       .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.log(errorCode, errorMessage);
        });
    }

    function handleSignIn(){
        if(!email ||!password) return;
        signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) =>{
            const user = userCredential.user;
            console.log(user);
            navigate('/private'); // navigate to the homepage after sign in
        })
       .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
            console.log(errorCode, errorMessage);
        });
    }

    function toggleForm(){
        setIsSignUpActive(!isSignUpActive);
    }

    return (
        <form>
            <fieldset>
                <ul>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={handleEmailChange}/>
                    </li>

                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
                    </li>
                </ul>
                {isSignUpActive && (
                    <button type="button" onClick={handleSignUp}>Sign Up</button>
                )}

                {!isSignUpActive && (
                    <button type="button" onClick={handleSignIn}>Sign In</button>
                )}
            </fieldset>

            {isSignUpActive && <a onClick={toggleForm}>Already have an account? Sign in</a>}
            {!isSignUpActive && <a onClick={toggleForm}>Do not have an account? Sign Up</a>}
            {error && <p style={{ color: 'ed' }}>{error}</p>}
        </form>
    );
}

export default Home;