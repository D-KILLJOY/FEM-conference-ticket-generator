import { useEffect, useMemo, useRef } from "react";
import iconUpload from "../assets/images/icon-upload.svg";
import { MdInfoOutline } from "react-icons/md";

type dispState = "form" | "ticket";

type FieldKey = "name" | "email" | "github";

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

interface formProps {
    dispToggle: (state: dispState) => void;
    userDets: UserDetails;
    setUserDets: React.Dispatch<React.SetStateAction<UserDetails>>;
}

function Form({ dispToggle, userDets, setUserDets }: formProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const maxSize = 500 * 1024;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^@[a-zA-Z0-9_](?:[a-zA-Z0-9_.-]{0,28}[a-zA-Z0-9])?$/;

    function handleFile(file: File | undefined) {
        if (!file) return;

        if (!["image/png", "image/jpeg"].includes(file.type)) {
            setUserDets((prev) => ({
                ...prev,
                avatar: {
                    value: null,
                    error: true,
                    errormsg: "Only PNG or JPG images allowed",
                },
            }));

            return;
        }

        if (file.size > maxSize) {
            setUserDets((prev) => ({
                ...prev,
                avatar: {
                    value: null,
                    error: true,
                    errormsg:
                        "File too large, Please upload a photo under under 500KB.",
                },
            }));
            return;
        }

        setUserDets((prev) => ({
            ...prev,
            avatar: {
                value: file,
                error: false,
                errormsg: " ",
            },
        }));
    }

    function updateInput(key: FieldKey, value: string) {
        setUserDets((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                value,
                error: false,
                errormsg: "",
            },
        }));
    }

    const avatarPreview = useMemo(() => {
        return userDets.avatar.value
            ? URL.createObjectURL(userDets.avatar.value)
            : undefined;
    }, [userDets.avatar.value]);

    useEffect(() => {
        return () => {
            if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        };
    }, [avatarPreview]);

    function removeImg() {
        setUserDets((prev) => ({
            ...prev,
            avatar: {
                value: null,
                error: false,
                errormsg: "",
            },
        }));
    }

    function imgChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    }

    function imgDrop(e: React.DragEvent<HTMLDivElement>) {
        if (userDets.avatar.value) {
            setUserDets((prev) => ({
                ...prev,
                avatar: {
                    value: userDets.avatar.value,
                    error: true,
                    errormsg: "An image has already been uploaded",
                },
            }));
            return;
        }
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    }

    function formValidate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const updatedStatus = {
            avatar: {
                ...userDets.avatar,
                error: userDets.avatar.value === null,
                errormsg:
                    userDets.name.value.trim() === ""
                        ? "You need to upload a photo"
                        : "",
            },

            name: {
                ...userDets.name,
                error:
                    userDets.name.value.trim() === "" ||
                    userDets.name.value.trim().length < 2,

                errormsg:
                    userDets.name.value.trim() === ""
                        ? "Name cannot be empty"
                        : userDets.name.value.trim().length < 2
                          ? "Name must be at least 2 Characters long"
                          : "",
            },

            email: {
                ...userDets.email,
                error:
                    userDets.email.value.trim() === "" ||
                    !emailRegex.test(userDets.email.value.trim()),
                errormsg:
                    userDets.email.value.trim() === ""
                        ? "Email cannot be empty"
                        : emailRegex.test(userDets.email.value.trim())
                          ? ""
                          : "Looks like this is not an email",
            },
            github: {
                ...userDets.github,
                error:
                    userDets.github.value.trim() === "" ||
                    !usernameRegex.test(userDets.github.value.trim()) ||
                    userDets.github.value.trim().length < 2,
                errormsg:
                    userDets.github.value.trim() === ""
                        ? "Github username cannot be empty"
                        : !usernameRegex.test(userDets.github.value.trim())
                          ? "Invalid username, include an @ before your username"
                          : "",
            },
        };

        setUserDets(updatedStatus);
        toggleState(updatedStatus);
    }

    function toggleState(status: UserDetails) {
        const allValid =
            status.avatar.value !== null &&
            !status.avatar.error &&
            status.name.value.trim() !== "" &&
            !status.name.error &&
            status.email.value.trim() !== "" &&
            !status.email.error &&
            status.github.value.trim() !== "" &&
            !status.github.error;

        if (!allValid) return;

        dispToggle("ticket");
    }

    return (
        <>
            <header className="px-2 w-full mx-auto md:max-w-130 lg:max-w-180">
                <h1 className="font-bold text-[1.625rem] text-center mb-5 leading-8 md:leading-10 md:text-4xl lg:text-5xl lg:leading-15">
                    Your Journey to Coding Conf 2025 Starts Here!
                </h1>
                <p className="mb-8 text-Neutral-500 text-[1.1rem] leading-7 font-medium text-center md:text-xl">
                    Secure your spot at next year's biggest coding conference.
                </p>
            </header>
            <form onSubmit={formValidate} className="w-full max-w-100">
                <div className="mb-4">
                    <p className="mb-2">Upload Avatar</p>
                    <div
                        onDrop={imgDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border w-full border-dashed flex flex-col justify-center items-center bg-Neutral-700/35 p-3 rounded-2xl border-Neutral-500 "
                    >
                        <label
                            className="mb-4 cursor-pointer"
                            htmlFor={userDets.avatar.value ? "" : "avatar"}
                        >
                            <img
                                src={
                                    userDets.avatar.value
                                        ? avatarPreview
                                        : iconUpload
                                }
                                alt=""
                                className={`border-2 border-Neutral-500 bg-Neutral-700/55 rounded-xl  w-12 h-12 ${userDets.avatar.value ? "" : "p-2"}`}
                            />
                        </label>
                        <input
                            onChange={imgChange}
                            ref={fileInputRef}
                            id="avatar"
                            type="file"
                            accept="image/png,image/jpeg"
                            hidden
                            className="w-full"
                        />
                        {userDets.avatar.value ? (
                            <div className="flex gap-2 items-center">
                                <button
                                    type="button"
                                    onClick={removeImg}
                                    className="px-2 pt-1 rounded underline text-Neutral-300 bg-Neutral-700 text-sm cursor-pointer"
                                >
                                    Remove image
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="px-2 pt-1 rounded text-Neutral-300 bg-Neutral-700 text-sm cursor-pointer"
                                >
                                    Change image
                                </button>
                            </div>
                        ) : (
                            <p className="text-Neutral-500">
                                Drag and drop or click to upload
                            </p>
                        )}
                    </div>
                    {userDets.avatar.error === false ? (
                        <div className="flex justify-start items-center text-xs mt-2 gap-2 text-Neutral-500">
                            <MdInfoOutline className="text-sm" />
                            <p>
                                Upload your photo (JPG or PNG, max size: 500KB).
                            </p>
                        </div>
                    ) : (
                        <div className="flex justify-start items-center text-xs mt-2 gap-2 text-red-400">
                            <MdInfoOutline className="text-sm" />
                            <p>{userDets.avatar.errormsg}</p>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <p className="mb-2">Full Name</p>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userDets.name.value}
                        onChange={(e) =>
                            updateInput("name", e.currentTarget.value)
                        }
                        className={`w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg ${userDets.name.error ? "border-red-400" : ""}`}
                        placeholder="John Doe"
                    />

                    {userDets.name.error && (
                        <div className="flex justify-start items-center text-xs mt-2 gap-2 text-red-400">
                            <MdInfoOutline className="text-sm" />
                            <p>{userDets.name.errormsg}</p>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <p className="mb-2">Email Address</p>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDets.email.value}
                        onChange={(e) =>
                            updateInput("email", e.currentTarget.value)
                        }
                        className={`w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg ${userDets.email.error ? "border-red-400" : ""}`}
                        placeholder="User@mail.com"
                    />

                    {userDets.email.error && (
                        <div className="flex justify-start items-center text-xs mt-2 gap-2 text-red-400">
                            <MdInfoOutline className="text-sm" />
                            <p>{userDets.email.errormsg}</p>
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <p className="mb-2">GitHub Username</p>

                    <input
                        type="text"
                        id="github"
                        name="github"
                        value={userDets.github.value}
                        onChange={(e) =>
                            updateInput("github", e.currentTarget.value)
                        }
                        className={`w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg ${userDets.github.error ? "border-red-400" : ""}`}
                        placeholder="@yourusername"
                    />

                    {userDets.github.error && (
                        <div className="flex justify-start items-center text-xs mt-2 gap-2 text-red-400">
                            <MdInfoOutline className="text-sm" />
                            <p>{userDets.github.errormsg}</p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full border border-Orange-500 bg-Orange-500 text-Neutral-900 font-bold rounded-lg p-3 cursor-pointer focus:outline-2 focus:outline-Neutral-500 focus:outline-offset-2 "
                >
                    Generate My Ticket
                </button>
            </form>
        </>
    );
}

export default Form;
