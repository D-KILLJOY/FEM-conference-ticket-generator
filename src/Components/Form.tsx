import iconUpload from "../assets/images/icon-upload.svg";
import { MdInfoOutline } from "react-icons/md";

function Form() {
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
            <form action="">
                <div className="mb-4">
                    <p className="mb-2">Upload Avatar</p>
                    <label className="border w-full border-dashed flex flex-col justify-center items-center bg-Neutral-700/30 p-3 rounded-2xl border-Neutral-500 ">
                        <img
                            src={iconUpload}
                            alt=""
                            className="border border-Neutral-700 bg-Neutral-700/55 rounded-xl p-2 mb-4"
                        />
                        <input
                            type="file"
                            accept=".png,.jpg"
                            hidden
                            className="w-full"
                        />
                        <p className="text-Neutral-500">
                            Drag and drop or click to upload
                        </p>
                    </label>
                    <span className="flex justify-start items-center text-xs mt-2 gap-2 text-Neutral-500">
                        <MdInfoOutline className="text-sm" />
                        <p className="co">
                            Upload your photo (JPG or PNG, max size: 500KB).
                        </p>
                    </span>
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
