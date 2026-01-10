import patternTicket from "../assets/images/pattern-ticket.svg";
import iconGithub from "../assets/images/icon-github.svg";
import logoIcon from "../assets/images/logo-mark.svg";
import userImg from "../assets/images/image-avatar.jpg";

function Ticket() {
    return (
        <>
            <header className="px-2">
                <h1 className="font-bold text-3xl text-center mb-8">
                    Congrats,{" "}
                    <span className="bg-[linear-gradient(to_right,var(--gradient-from),var(--gradient-to))] bg-clip-text text-transparent">
                        Jonatan Kristof
                    </span>{" "}
                    ! Your ticket is ready.
                </h1>
                <p className="mb-8 text-Neutral-500 text-lg leading-6 font-medium text-center">
                    We've emailed your ticket to{" "}
                    <span className="text-Orange-700">jonatan@email.com</span>{" "}
                    and will send updates in the run up to the event.
                </p>
            </header>
            <section className="relative w-full max-w-100 min-h-40 h-fit my-10 border-Orange-500 border-2 ">
                <img src={patternTicket} alt="" className="absolute inset-0 " />
                <div className="p-4 relative z-30 w-full h-full flex flex-col justify-between border">
                    <div className="flex gap-3 items-start">
                        <img src={logoIcon} alt="Coding Conf" className="w-7" />
                        <article>
                            <p className="text-xl font-bold leading-3 mb-4">
                                Coding Conf
                            </p>
                            <p className="text-Neutral-500 text-sm">
                                Jan 31, 2025 / Austin, TX
                            </p>
                        </article>
                    </div>
                    <div className="flex gap-3 items-start">
                        <img
                            src={userImg}
                            alt="User Image"
                            className="rounded-lg w-12 h-12"
                        />
                        <article className="flex flex-col justify-between ">
                            <p>Jonatan Kristof</p>
                            <p className="flex gap-1">
                                <img
                                    src={iconGithub}
                                    alt="github Icon"
                                    className="w-4.5 h-4.5"
                                />
                                <span className="text-Neutral-500 text-sm">
                                    @Jonatankristof0101
                                </span>
                            </p>
                        </article>
                    </div>
                </div>
            </section>
            <p> </p>
        </>
    );
}

export default Ticket;
