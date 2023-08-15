import AuthForm from "@/app/AuthForm";

export default function DashboardSignIn() {
    return (
        <div className="flex flex-row">
            <div id="left-panel" className="flex flex-col place-items-center">
                <div className="px-32 py-32">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                    <div className="w-96">
                        <AuthForm />
                    </div>
                </div>
            </div>
            <div id="right-panel">
                <h1>Suburbly</h1>
            </div>
        </div>
    );
}
