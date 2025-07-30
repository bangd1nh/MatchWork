import { useAuthStore, Role } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleLogin = (role: Role) => {
        const user = {
            id: `${Date.now()}`,
            name: `${
                role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
            } User`,
            role: role,
        };
        login(user);

        switch (role) {
            case "ADMIN":
                navigate("/admin/dashboard");
                break;
            case "EMPLOYER":
                navigate("/employer/dashboard");
                break;
            case "JOBSEEKER":
                navigate("/jobseeker/dashboard");
                break;
            default:
                navigate("/");
                break;
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Select a Role to Login
                </h2>
                <div className="space-y-4">
                    <Button
                        onClick={() => handleLogin("ADMIN")}
                        className="w-full bg-red-600 hover:bg-red-700"
                    >
                        Login as Admin
                    </Button>
                    <Button
                        onClick={() => handleLogin("EMPLOYER")}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                        Login as Employer
                    </Button>
                    <Button
                        onClick={() => handleLogin("JOBSEEKER")}
                        className="w-full bg-green-600 hover:bg-green-700"
                    >
                        Login as Job Seeker
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
