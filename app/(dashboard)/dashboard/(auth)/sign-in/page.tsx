import AuthForm from "@/app/AuthForm";
import Link from "next/link";

export default function SignIn() {
    return (
        // TODO 1: Make auth page responsive for mobile
        <div className="">
            <h1 className="text-3xl font-inter500">Welcome Back</h1>
            <p className="mt-1 mb-10 text-sm font-normal">Sign in to your account</p>
            <AuthForm />
            <p className="text-center text-sm font-normal">
                Don't have an account?{" "}
                <Link href={"/dashboard/sign-up"} className="underline font-semibold">
                    Sign up here
                </Link>
                {""}
            </p>
        </div>
    );
}
