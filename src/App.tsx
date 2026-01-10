import { useState } from "react";
import mainLogo from "./assets/images/logo-full.svg";
// import circlePattern from "./assets/images/pattern-circle.svg";
// import linesPattern from "./assets/images/pattern-lines.svg";
// import logoIcon from "./assets/images/logo-mark.svg";
// import userImg from "./assets/images/image-avatar.jpg";
// import iconGithub from "./assets/images/icon-github.svg";
// import patternTicket from "./assets/images/pattern-ticket.svg";
// import squigglybtmmbl from "./assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
// import squigglybtmdsk from "./assets/images/pattern-squiggly-line-bottom-desktop.svg";
// import squigglyTop from "./assets/images/pattern-squiggly-line-top.svg";
import Form from "./Components/Form.tsx";
import Ticket from "./Components/Ticket.tsx";

type dispState = "form" | "ticket";

function App() {
    const [status, setStatus] = useState<dispState>("ticket");

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
