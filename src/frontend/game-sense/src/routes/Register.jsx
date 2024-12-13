import textLogo from '/text-logo.png';
import iconLogo from '/icon-logo.png';

export default function Register() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-white">
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-10">
                    <img src={iconLogo} alt="icon-logo" className="w-60 h-auto" />
                    <img src={textLogo} alt="text-logo" className="w-64 h-auto mt-4" />
                </div>

                <div
                    className="card w-full max-w-md shadow-2xl p-8 bg-[#333D4D] rounded-lg"
                >
                    <div className="flex flex-col space-y-4">
                        {/* Full Name Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Full Name</label>
                            <input
                                type="text"
                                placeholder="fullname"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                            />
                        </div>

                        {/* Username Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Username</label>
                            <input
                                type="text"
                                placeholder="username"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                            />
                        </div>

                        {/* Favourite Team Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Favourite Team</label>
                            <input
                                type="text"
                                placeholder="team"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Password</label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800 "
                            />
                        </div>

                        {/*  Confirm Password Input */}
                        <div>
                            <label className="text-sm text-gray-200 mb-1 block">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered w-full p-2 rounded-md bg-white text-gray-800"
                            />
                        </div>


                        {/* Premium Checkbox */}
                        <div className="form-control">
                            <label className="cursor-pointer flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-md border-white border-1 checked:bg-white "
                                />
                                <span className="text-white">Premium Account</span>
                            </label>
                        </div>


                        {/* Register Button */}
                        <div className="flex items-center">
                            <button
                                className="btn w-full text-white py-2 px-4 rounded-md text-lg bg-[#21A179]"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
