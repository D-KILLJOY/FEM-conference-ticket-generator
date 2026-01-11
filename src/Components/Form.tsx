import { useEffect, useRef, useState } from "react";
import iconUpload from "../assets/images/icon-upload.svg";
import { MdInfoOutline } from "react-icons/md";

type dispState = "form" | "ticket";

type FieldKey = "name" | "email" | "github";

type InputField = {
    value: string;
    error: boolean;
    errormsg: string;
};

interface formProps {
    dispToggle: (state: dispState) => void;
}

type UserDetails = {
    avatar: InputField;
    name: InputField;
    email: InputField;
    github: InputField;
};

function Form({ dispToggle }: formProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [userDetails, setUserDetails] = useState<UserDetails>({
        avatar: {
            value: "",
            error: false,
            errormsg: "",
        },
        name: { value: "", error: false, errormsg: "" },
        email: { value: "", error: false, errormsg: "" },
        github: { value: "", error: false, errormsg: "" },
    });

    const maxSize = 500 * 1024;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^@[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?$/;

    function handleFile(file: File | undefined) {
        if (!file) return;

        if (!["image/png", "image/jpeg"].includes(file.type)) {
            setUserDetails((prev) => ({
                ...prev,
                avatar: {
                    value: "",
                    error: true,
                    errormsg: "Only PNG or JPG images allowed",
                },
            }));

            return;
        }

        if (file.size > maxSize) {
            setUserDetails((prev) => ({
                ...prev,
                avatar: {
                    value: "",
                    error: true,
                    errormsg:
                        "File too large, Please upload a photo under under 500KB.",
                },
            }));
            return;
        }

        setUserDetails((prev) => ({
            ...prev,
            avatar: {
                value: URL.createObjectURL(file),
                error: false,
                errormsg: " ",
            },
        }));
    }

    function updateInput(key: FieldKey, value: string) {
        setUserDetails((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                value,
                error: false,
                errormsg: "",
            },
        }));
    }

    useEffect(() => {
        return () => {
            if (userDetails.avatar.value) {
                console.log(userDetails.avatar.value);
                URL.revokeObjectURL(userDetails.avatar.value);
            }
        };
    }, [userDetails.avatar.value]);

    function removeImg() {
        setUserDetails((prev) => ({
            ...prev,
            avatar: {
                value: "",
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
        if (userDetails.avatar.value) {
            setUserDetails((prev) => ({
                ...prev,
                avatar: {
                    value: userDetails.avatar.value,
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
                ...userDetails.avatar,
                error: userDetails.avatar.value.trim() === "",
                errormsg:
                    userDetails.name.value.trim() === ""
                        ? "You need to upload a photo"
                        : "",
            },

            name: {
                ...userDetails.name,
                error:
                    userDetails.name.value.trim() === "" ||
                    userDetails.name.value.trim().length < 2,

                errormsg:
                    userDetails.name.value.trim() === ""
                        ? "Name cannot be empty"
                        : userDetails.name.value.trim().length < 2
                          ? "Name must be at least 2 Characters long"
                          : "",
            },

            email: {
                ...userDetails.email,
                error:
                    userDetails.email.value.trim() === "" ||
                    !emailRegex.test(userDetails.email.value.trim()),
                errormsg:
                    userDetails.email.value.trim() === ""
                        ? "Email cannot be empty"
                        : emailRegex.test(userDetails.email.value.trim())
                          ? ""
                          : "Looks like this is not an email",
            },
            github: {
                ...userDetails.github,
                error:
                    userDetails.github.value.trim() === "" ||
                    !usernameRegex.test(userDetails.github.value.trim()) ||
                    userDetails.github.value.trim().length < 2,
                errormsg:
                    userDetails.github.value.trim() === ""
                        ? "Github username cannot be empty"
                        : usernameRegex.test(userDetails.github.value.trim())
                          ? "Invalid username, include an @ before your username"
                          : "",
            },
        };

        setUserDetails(updatedStatus);
        toggleState(updatedStatus);
    }

    function toggleState(status: UserDetails) {
        const allValid =
            status.avatar.value.trim() !== "" &&
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
            <header className="px-2">
                <h1 className="font-bold text-[1.625rem] text-center mb-5 leading-8">
                    Your Journey to Coding Conf 2025 Starts Here!
                </h1>
                <p className="mb-8 text-Neutral-500 text-[1.1rem] leading-6 font-medium text-center">
                    Secure your spot at next year's biggest coding conference.
                </p>
            </header>
            <form onSubmit={formValidate} className="w-full max-w-100">
                <div className="mb-4">
                    <p className="mb-2">Upload Avatar</p>
                    <div
                        onDrop={imgDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border w-full border-dashed flex flex-col justify-center items-center bg-Neutral-700/30 p-3 rounded-2xl border-Neutral-500 "
                    >
                        <label
                            className="mb-4 cursor-pointer"
                            htmlFor={userDetails.avatar.value ? "" : "avatar"}
                        >
                            <img
                                src={
                                    userDetails.avatar.value
                                        ? userDetails.avatar.value
                                        : iconUpload
                                }
                                alt=""
                                className={`border-2 border-Neutral-500 bg-Neutral-700/55 rounded-xl  w-12 h-12 ${userDetails.avatar.value ? "" : "p-2"}`}
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
                        {userDetails.avatar.value ? (
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
                    {userDetails.avatar.error === false ? (
                        <span className="flex justify-start items-center text-xs mt-2 gap-2 text-Neutral-500">
                            <MdInfoOutline className="text-sm" />
                            <p>
                                Upload your photo (JPG or PNG, max size: 500KB).
                            </p>
                        </span>
                    ) : (
                        <span className="flex justify-start items-center text-xs mt-2 gap-2 text-red-400">
                            <MdInfoOutline className="text-sm" />
                            <p>{userDetails.avatar.errormsg}</p>
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <p className="mb-2">Full Name</p>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userDetails.name.value}
                        onChange={(e) =>
                            updateInput("name", e.currentTarget.value)
                        }
                        className={`w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg ${userDetails.name.error ? "border-red-400" : ""}`}
                        placeholder="John Doe"
                    />

                    {userDetails.name.error && (
                        <span className="flex justify-start items-center text-xs mt-2 gap-2 text-red-400">
                            <MdInfoOutline className="text-sm" />
                            <p>{userDetails.name.errormsg}</p>
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <p className="mb-2">Email Address</p>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userDetails.email.value}
                        onChange={(e) =>
                            updateInput("email", e.currentTarget.value)
                        }
                        className={`w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg ${userDetails.email.error ? "border-red-400" : ""}`}
                        placeholder="User@mail.com"
                    />

                    {userDetails.email.error && (
                        <span className="flex justify-start items-center text-xs mt-2 gap-2 text-red-400">
                            <MdInfoOutline className="text-sm" />
                            <p>{userDetails.email.errormsg}</p>
                        </span>
                    )}
                </div>
                <div className="mb-6">
                    <p className="mb-2">GitHub Username</p>

                    <input
                        type="text"
                        id="github"
                        name="github"
                        value={userDetails.github.value}
                        onChange={(e) =>
                            updateInput("github", e.currentTarget.value)
                        }
                        className={`w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg ${userDetails.github.error ? "border-red-400" : ""}`}
                        placeholder="@yourusername"
                    />

                    {userDetails.github.error && (
                        <span className="flex justify-start items-center text-xs mt-2 gap-2 text-red-400">
                            <MdInfoOutline className="text-sm" />
                            <p>{userDetails.github.errormsg}</p>
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full border border-Orange-500 bg-Orange-500 text-Neutral-900 font-bold rounded-lg p-3 cursor-pointer"
                >
                    Generate My Ticket
                </button>
            </form>
        </>
    );
}

export default Form;
