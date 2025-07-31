import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";

// React Hook Form and Zod imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Chart imports
import SimplePieChart from "@/components/charts/SimplePieChart";
import SimpleLineChart from "@/components/charts/SimpleLineChart";
import SimpleBarChart from "@/components/charts/SimpleBarChart";

// i18n import
import { useTranslation } from 'react-i18next';

const OverviewPage = () => {
    const toast = useToast();
    const { t, i18n } = useTranslation();

    // Define form schema
    const formSchema = z.object({
        username: z.string().min(3, {
            message: t("username_min_length"),
        }),
        email: z.string().email({
            message: t("invalid_email"),
        }),
    });

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
        },
    });

    // Form submission handler
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
        toast("success", t("form_success"));
        reset(); // Reset form after successful submission
    };

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <div className="col-span-full flex justify-end mb-4">
                <Button onClick={toggleLanguage}>
                    {t("language_toggle")}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t("avatar_title")}</CardTitle>
                    <CardDescription>
                        {t("avatar_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("badge_title")}</CardTitle>
                    <CardDescription>
                        {t("badge_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Badge>Badge</Badge>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("button_title")}</CardTitle>
                    <CardDescription>
                        {t("button_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="default"
                        onClick={() => toast("error", "error")}
                    >
                        Button
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => toast("success", "error")}
                    >
                        Button
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => toast("warning", "error")}
                    >
                        Button
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => toast("info", "error")}
                    >
                        Button
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("card_title")}</CardTitle>
                    <CardDescription>
                        {t("card_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("dialog_title")}</CardTitle>
                    <CardDescription>
                        {t("dialog_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value="Pedro"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="username"
                                        className="text-right"
                                    >
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        value="@peduarte"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("input_title")}</CardTitle>
                    <CardDescription>
                        {t("input_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input type="email" placeholder="Email" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("label_title")}</CardTitle>
                    <CardDescription>
                        {t("label_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="email">{t("email_label")}</Label>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("popover_title")}</CardTitle>
                    <CardDescription>
                        {t("popover_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline">Open popover</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">
                                        Dimensions
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Set the dimensions for the layer.
                                    </p>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("scroll_area_title")}</CardTitle>
                    <CardDescription>
                        {t("scroll_area_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-72 w-48 rounded-md border">
                        <div className="p-4">
                            Jokester began sneaking into the castle in the
                            middle of the night and leaving jokes all over the
                            place: under the king's pillow, in his soup, even in
                            the royal toilet. The king was furious, but he
                            couldn't seem to stop Jokester.
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("select_title")}</CardTitle>
                    <CardDescription>
                        {t("select_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                    Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                    Pineapple
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("separator_title")}</CardTitle>
                    <CardDescription>
                        {t("separator_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-medium leading-none">
                                Radix Primitives
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                An open-source UI component library.
                            </p>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>Blog</div>
                            <Separator orientation="vertical" />
                            <div>Docs</div>
                            <Separator orientation="vertical" />
                            <div>Source</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("table_title")}</CardTitle>
                    <CardDescription>
                        {t("table_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>
                            A list of your recent invoices.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Invoice
                                </TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    INV001
                                </TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">
                                    $250.00
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("tabs_title")}</CardTitle>
                    <CardDescription>
                        {t("tabs_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="account" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            Make changes to your account here.
                        </TabsContent>
                        <TabsContent value="password">
                            Change your password here.
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t("textarea_title")}</CardTitle>
                    <CardDescription>
                        {t("textarea_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Type your message here." />
                </CardContent>
            </Card>

            {/* New Form Card */}
            <Card className="w-full max-w-md col-span-full mx-auto mt-8">
                <CardHeader>
                    <CardTitle>{t("simple_form_title")}</CardTitle>
                    <CardDescription>
                        {t("simple_form_description")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="username">{t("username_label")}</Label>
                            <Input
                                id="username"
                                type="text"
                                {...register("username")}
                                className={
                                    errors.username ? "border-red-500" : ""
                                }
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="email">{t("email_label")}</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            {t("submit_button")}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Chart Cards */}
            <SimplePieChart />
            <SimpleLineChart />
            <SimpleBarChart />
        </div>
    );
};

export default OverviewPage;