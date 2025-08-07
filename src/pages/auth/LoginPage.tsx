import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
    const { t } = useTranslation();

    const loginSchema = z.object({
        email: z.string().email({ message: t("invalid_email_address") }),
        password: z.string().min(6, { message: t("password_min_length") }),
    });

    type LoginFormInputs = z.infer<typeof loginSchema>;

    const { login, isLoading, isError, error } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormInputs) => {
        login(data);
    };

    return (
        <div className="flex items-center justify-center h-[80vh] bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            {t("login_title")}
                        </CardTitle>
                        <CardDescription>
                            {t("login_description")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t("email_label")}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">
                                {t("password_label")}
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {isError && (
                            <p className="text-sm text-red-600">
                                {error?.message || t("login_failed_generic")}
                            </p>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? t("logging_in") : t("sign_in")}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
