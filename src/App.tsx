import mainLogo from "./assets/images/logo-full.svg";
import circlePattern from "./assets/images/pattern-circle.svg";
import linesPattern from "./assets/images/pattern-lines.svg";
import iconUpload from "./assets/images/icon-upload.svg";
import logoIcon from "./assets/images/logo-mark.svg";
import userImg from "./assets/images/image-avatar.jpg";
import iconInfo from "./assets/images/icon-info.svg";
import iconGithub from "./assets/images/icon-github.svg";
import patternTicket from "./assets/images/pattern-ticket.svg";
import squigglybtmmbl from "./assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import squigglybtmdsk from "./assets/images/pattern-squiggly-line-bottom-desktop.svg";
import squigglyTop from "./assets/images/pattern-squiggly-line-top.svg";

function App() {
    return (
        <main className="py-8 px-4 w-full min-h-screen bg-cover bg-center bg-no-repeat  relative">
            <header>
                <img src={mainLogo} alt="Coding Conf" />
            </header>
            <p>
                Your Journey to Coding Conf 2025 Starts Here! Secure your spot
                at next year's biggest coding conference. Upload Avatar Drag and
                drop or click to upload Upload your photo (JPG or PNG, max size:
                500KB). Full Name Email Address example@email.com GitHub
                Username @yourusername Generate My Ticket Congrats, ! Your
                ticket is ready. We've emailed your ticket to and will send
                updates in the run up to the event. Coding Conf Jan 31, 2025 /
                Austin, TX
            </p>
        </main>
    );
}

export default App;
