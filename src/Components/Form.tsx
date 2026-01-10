import { useEffect, useState } from "react";
import iconUpload from "../assets/images/icon-upload.svg";
import { MdInfoOutline } from "react-icons/md";

type InputField = {
    value: null | string;
    error: boolean;
    errormsg: string;
};

type UserDetails = {
    avatar: InputField;
    name: InputField;
    email: InputField;
    github: InputField;
};

function Form() {
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

    const handleFile = (file: File | undefined) => {
        if (!file) return;

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

        if (!["image/png", "image/jpeg"].includes(file.type)) {
            setUserDetails((prev) => ({
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
            setUserDetails((prev) => ({
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

        setUserDetails((prev) => ({
            ...prev,
            avatar: {
                value: URL.createObjectURL(file),
                error: false,
                errormsg: " ",
            },
        }));
    };

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
                value: null,
                error: false,
                errormsg: "",
            },
        }));
    }

    const imgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const imgDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

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
            <form className="w-full max-w-100">
                <div className="mb-4">
                    <p className="mb-2">Upload Avatar</p>
                    <label
                        onDrop={imgDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="border w-full border-dashed flex flex-col justify-center items-center bg-Neutral-700/30 p-3 rounded-2xl border-Neutral-500 "
                    >
                        <img
                            src={
                                userDetails.avatar.value
                                    ? userDetails.avatar.value
                                    : iconUpload
                            }
                            alt=""
                            className={`border-2 border-Neutral-500 bg-Neutral-700/55 rounded-xl mb-4 w-12 h-12 ${userDetails.avatar.value ? "" : "p-2"}`}
                        />
                        <input
                            onChange={imgChange}
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
                                    className="px-2 pt-1 rounded underline text-Neutral-300 bg-Neutral-700 text-sm"
                                >
                                    Remove image
                                </button>
                                <button
                                    type="button"
                                    className="px-2 pt-1 rounded text-Neutral-300 bg-Neutral-700 text-sm"
                                >
                                    Change image
                                </button>
                            </div>
                        ) : (
                            <p className="text-Neutral-500">
                                Drag and drop or click to upload
                            </p>
                        )}
                    </label>
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
                        className="w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg"
                        placeholder="John Doe"
                    />

                    <span className="flex justify-start items-center text-xs mt-2 gap-2 text-Neutral-500">
                        <MdInfoOutline className="text-sm" />
                        <p className="co">Name cannot be Empty.</p>
                    </span>
                </div>
                <div className="mb-4">
                    <p className="mb-2">Email Address</p>

                    <input
                        type="text"
                        className="w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg cursor-pointer"
                        placeholder="User@mail.com"
                    />

                    <span className="flex justify-start items-center text-xs mt-2 gap-2 text-Neutral-500">
                        <MdInfoOutline className="text-sm" />
                        <p className="co">Email cannot be Empty.</p>
                    </span>
                </div>
                <div className="mb-4">
                    <p className="mb-2">GitHub Username</p>

                    <input
                        type="text"
                        className="w-full border rounded-xl bg-Neutral-700/30 p-3  border-Neutral-500 text-lg cursor-pointer"
                        placeholder="@yourusername"
                    />

                    <span className="flex justify-start items-center text-xs mt-2 gap-2 text-Neutral-500">
                        <MdInfoOutline className="text-sm" />
                        <p className="co">UserName cannot be Empty.</p>
                    </span>
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
