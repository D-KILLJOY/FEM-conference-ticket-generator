import patternTicket from "../assets/images/pattern-ticket.svg";
import iconGithub from "../assets/images/icon-github.svg";
import logoIcon from "../assets/images/logo-mark.svg";
import { useEffect, useState } from "react";

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

interface ticketProps {
    userDets: UserDetails;
}

function Ticket({ userDets }: ticketProps) {
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        if (!userDets.avatar.value) {
            setAvatarPreview(undefined);
            return;
        }

        const url = URL.createObjectURL(userDets.avatar.value);
        setAvatarPreview(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [userDets.avatar.value]);

    return (
        <>
            <header className="px-2 w-full mx-auto md:max-w-130 lg:max-w-180">
                <h1 className="font-bold text-3xl text-center mb-8 lg:text-5xl lg:leading-15">
                    Congrats,{" "}
                    <span className="bg-[linear-gradient(to_right,var(--gradient-from),var(--gradient-to))] bg-clip-text text-transparent">
                        {userDets.name.value}
                    </span>{" "}
                    ! Your ticket is ready.
                </h1>
                <p className="mb-8 text-Neutral-500 text-lg leading-7 font-medium text-center md:text-xl  lg:max-w-110 mx-auto">
                    We've emailed your ticket to{" "}
                    <span className="text-Orange-700">
                        {userDets.email.value}
                    </span>{" "}
                    and will send updates in the run up to the event.
                </p>
            </header>
            <section className="relative w-full max-w-100 min-h-40 h-fit mt-10 mb-40 ">
                <img src={patternTicket} alt="" />

                <article className="w-full h-full p-4 pe-0 absolute inset-0 flex ">
                    <div className="z-30 w-full h-full flex flex-col justify-between ">
                        <div className="flex gap-3 items-start">
                            <img
                                src={logoIcon}
                                alt="Coding Conf"
                                className="w-7 md:w-8"
                            />
                            <article>
                                <p className="text-xl font-bold leading-3 mb-4 md:text-2xl">
                                    Coding Conf
                                </p>
                                <p className="text-Neutral-500 text-sm md:text-base">
                                    Jan 31, 2025 / Austin, TX
                                </p>
                            </article>
                        </div>
                        <div className="flex gap-3 ">
                            <img
                                src={avatarPreview}
                                alt="User Image"
                                className="rounded-lg w-12 h-12 md:w-14 md:h-14"
                            />
                            <article className="flex flex-col justify-between ">
                                <p className="md:text-xl">
                                    {userDets.name.value}
                                </p>
                                <p className="flex gap-1 items-center">
                                    <img
                                        src={iconGithub}
                                        alt="github Icon"
                                        className="w-4.5 h-4.5 md:h-6 md:w-6 "
                                    />
                                    <span className="text-Neutral-500 text-sm md:text-lg">
                                        {userDets.github.value}
                                    </span>
                                </p>
                            </article>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <p className="rotate-90 text-Neutral-500 text-xl md:text-2xl">
                            #01609
                        </p>
                    </div>
                </article>
            </section>
            <p> </p>
        </>
    );
}

export default Ticket;
