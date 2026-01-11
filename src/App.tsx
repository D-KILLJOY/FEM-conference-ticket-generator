import { useState } from "react";
import mainLogo from "./assets/images/logo-full.svg";
import Form from "./Components/Form.tsx";
import Ticket from "./Components/Ticket.tsx";

type dispState = "form" | "ticket";

type InputField<T> = {
    value: T;
    error: boolean;
    errormsg: string;
};

type UserDetails = {
    avatar: InputField<File | null>;
    name: InputField<string>;
    email: InputField<string>;
    github: InputField<string>;
};

function App() {
    const [status, setStatus] = useState<dispState>("form");
    const [userDetails, setUserDetails] = useState<UserDetails>({
        avatar: {
            value: null,
            error: false,
            errormsg: "",
        },
        name: { value: "", error: false, errormsg: "" },
        email: { value: "", error: false, errormsg: "" },
        github: { value: "", error: false, errormsg: "" },
    });

    function dispSet(stat: dispState) {
        setStatus(stat);
    }

    return (
        <main
            className="py-10 pb-25 px-4 w-full mx-auto min-h-screen flex flex-col items-center relative bg-size-[cover,7.5rem,15.625rem,8rem] bg-position-[center,100%_4%,bottom_left,130%_60%] bg-no-repeat md:bg-size-[cover,17.5rem,25.625rem,12rem] md:bg-position-[center,100%_7%,bottom_left,90%_55%] lg:bg-size-[cover,27.5rem,50%,15rem] lg:bg-position-[center,100%_7%,bottom_left,70%_55%]
"
        >
            <img
                src={mainLogo}
                alt="Coding Conf"
                className="mx-auto w-40 mb-10 md:w-50"
            />

            {status === "form" ? (
                <Form
                    dispToggle={dispSet}
                    userDets={userDetails}
                    setUserDets={setUserDetails}
                />
            ) : (
                <Ticket userDets={userDetails} />
            )}
        </main>
    );
}

export default App;
