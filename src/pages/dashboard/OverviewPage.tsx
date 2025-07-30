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

// Define form schema
const formSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
});

const OverviewPage = () => {
    const toast = useToast();

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
        toast("success", "Form submitted successfully!");
        reset(); // Reset form after successful submission
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Avatar</CardTitle>
                    <CardDescription>
                        Displays an image representation of a user or entity.
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
                    <CardTitle>Badge</CardTitle>
                    <CardDescription>
                        Displays a small piece of information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Badge>Badge</Badge>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Button</CardTitle>
                    <CardDescription>
                        Displays a button or a link.
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
                    <CardTitle>Card</CardTitle>
                    <CardDescription>
                        Displays a card with header, content, and footer.
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
                    <CardTitle>Dialog</CardTitle>
                    <CardDescription>
                        A window overlaid on either the primary window or
                        another dialog window.
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
                    <CardTitle>Input</CardTitle>
                    <CardDescription>
                        Displays a form input field.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Input type="email" placeholder="Email" />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Label</CardTitle>
                    <CardDescription>
                        Renders an accessible label associated with controls.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="email">Your email address</Label>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Popover</CardTitle>
                    <CardDescription>
                        Displays rich content in a portal, triggered by a
                        button.
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
                    <CardTitle>Scroll Area</CardTitle>
                    <CardDescription>
                        Visually or semantically separates content.
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
                    <CardTitle>Select</CardTitle>
                    <CardDescription>
                        Displays a list of options for the user to pick from.
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
                    <CardTitle>Separator</CardTitle>
                    <CardDescription>
                        Visually or semantically separates content.
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
                    <CardTitle>Table</CardTitle>
                    <CardDescription>
                        A responsive table component.
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
                    <CardTitle>Tabs</CardTitle>
                    <CardDescription>
                        A set of layered sections of content, known as tab
                        panels, that are displayed one at a time.
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
                    <CardTitle>Textarea</CardTitle>
                    <CardDescription>
                        Displays a multi-line text input field.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Type your message here." />
                </CardContent>
            </Card>

            {/* New Form Card */}
            <Card className="w-full max-w-md col-span-full mx-auto mt-8">
                <CardHeader>
                    <CardTitle>Simple Form with React Hook Form</CardTitle>
                    <CardDescription>
                        Demonstrates form handling and validation using React
                        Hook Form and Zod.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="username">Username</Label>
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
                            <Label htmlFor="email">Email</Label>
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
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default OverviewPage;
