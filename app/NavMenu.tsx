import Link from "next/link";
import AuthCheck from "@/components/AuthCheck";
import { Dialog } from "@/components/ui/dialog";
import { SignInButton, SignOutButton } from "@/components/AuthButtons";

export default function NavMenu() {
    return (
        <nav className="bg-deepDarkBlue w-screen h-20 flex flex-row">
            <div className="xl:pl-40 xl:mr-auto lg:pl-40 lg:mr-auto md:pl-32 md:mr-auto sm:pl-32 sm:mr-auto my-auto">
                <Link className="text-white text-2xl font-bold m-2" href={"/"}>
                    Suburbly
                </Link>
            </div>

            <div className="my-auto mr-6">
                <ul className="flex flex-row text-white space-x-7 font-semibold">
                    <li></li>
                </ul>
            </div>
            <div className="my-auto xl:pr-40 lg:pr-40 md:pr-32 sm:pr-32">
                <ul className="flex flex-row space-x-7 place-items-center text-white font-semibold mr-7 list-none">
                    <li>
                        <SignInButton />
                    </li>
                    <li>
                        <AuthCheck>
                            <SignOutButton />
                        </AuthCheck>
                    </li>

                    <li>
                        <Dialog />
                    </li>
                </ul>
            </div>
        </nav>
    );
}
