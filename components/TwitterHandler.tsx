import Button from "./Button";
import Logo from "@/components/LogoNew";

export default function Twitter() {

    return (
        <div className="top mx-4 mt-4 md:mx-6 md:my-2 flex items-center justify-between">
            <Logo size={64} /> <div className="">CryptoWatcher</div><Button text="+ Follow" />
        </div>
    )
} 