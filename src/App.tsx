import { useState } from "react";
import mainLogo from "./assets/images/logo-full.svg";
import Form from "./Components/Form.tsx";
import Ticket from "./Components/Ticket.tsx";

type dispState = "form" | "ticket";

function App() {
    const [status, setStatus] = useState<dispState>("form");

    function dispSet(stat: dispState) {
        setStatus(stat);
    }

    return (
        <main className="py-10 pb-25 px-4 w-full mx-auto min-h-screen bg-size-[cover,7.5rem,15.625rem] bg-position-[center,100%_4%,bottom_left] bg-no-repeat relative lg:bg-size-[cover,7.5rem,40%] flex flex-col items-center">
            <img
                src={mainLogo}
                alt="Coding Conf"
                className="mx-auto w-40 mb-10"
            />

            {status === "form" ? <Form dispToggle={dispSet} /> : <Ticket />}
        </main>
    );
}

export default App;
