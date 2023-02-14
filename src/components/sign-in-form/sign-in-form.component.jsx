import { useState , useEffect} from "react";
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassoword } from "../../utils/firebase/firebase.utils";
import { getRedirectResult, signInWithEmailAndPassword } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFieldds = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFieldds);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFieldds);
    }
    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassoword(email, password);
            resetFormFields();
        } catch (error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert("incorrect password for email");
                    break;
                case 'auth/user-not-found':
                    alert("no user associated with this email");
                    break;
                default:
                    console.log("user signin encountered an error", error);
            }
        }
    }

    useEffect(() => {
        const getResponse = async () => {
            const response = await getRedirectResult(auth);
            if(response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
        getResponse();
    },[])

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container" >
                    <Button type="submit">Sign in</Button>
                    <Button buttonType="google" type="button" onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
                <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
            </form>
        </div>
    )
}

export default SignInForm;