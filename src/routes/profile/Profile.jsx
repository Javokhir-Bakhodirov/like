import { Card, Avatar } from "antd";
import { useGetProfileQuery } from "../../redux/api/userApi";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { profile } from "../../redux/slices/profileSlice";

const { Meta } = Card;

const Profile = () => {
    const dispatch = useDispatch();
    const { data } = useGetProfileQuery();
    dispatch(profile(data?.payload));
    const user = data?.payload;

    console.log(user);

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow-sm rounded-md">
            {user && (
                <Card bordered={false} className="w-full">
                    <div className="flex flex-col items-center">
                        <Avatar
                            size={128}
                            src={user.photo_url}
                            className="mb-4 ring-4 ring-gray-300"
                        />
                        <h1 className="text-xl font-bold mb-4">
                            Shaxsiy ma'lumotlar
                        </h1>
                        <div className="grid grid-cols-2 gap-6 w-full">
                            <div className="flex flex-col items-start">
                                <p className="text-gray-800">
                                    <strong>Ism:</strong> {user.first_name}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Telefon raqam:</strong> {user.phone}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Jinsi:</strong> Male
                                </p>
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="text-gray-800">
                                    <strong>Familiya:</strong> {user.last_name}
                                </p>
                                <p className="text-gray-800">
                                    <strong>Tug'ilgan sana:</strong>{" "}
                                    {user.birth_date}
                                </p>
                                <p className="text-gray-800">
                                    <strong>HH ID:</strong> {user.hh_id}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Profile;
