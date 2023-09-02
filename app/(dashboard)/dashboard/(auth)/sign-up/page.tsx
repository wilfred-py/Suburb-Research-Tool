import AuthForm from "@/app/AuthForm";
import Link from "next/link";

export default function SignUp() {
    return (
        <div className="">
            <h1 className="text-3xl">Get Started</h1>
            <p className="mt-1 mb-10 text-sm font-normal">Create a new account</p>
            <AuthForm />
            <p className="text-center text-sm font-normal">
                Already have an account?{" "}
                <Link href={"/dashboard/sign-in"} className="underline font-semibold">
                    Log in
                </Link>
                {""}
            </p>
        </div>
    );
}
