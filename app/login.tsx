export default function Login() {
    return (
        <form action="/auth/login" method="post">
            <label htmlFor="email">Email</label>
            <input className="border border-black" name="email" />
            <label htmlFor="password">Password</label>
            <input className="border border-black" type="password" name="password" />
            <button>Sign In</button>
            <button formAction="/auth/sign-up">Sign Up</button>
        </form>
    );
}
