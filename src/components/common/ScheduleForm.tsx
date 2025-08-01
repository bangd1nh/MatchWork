import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const daysOfWeek = [
    { id: 1, label: "Thứ 2" },
    { id: 2, label: "Thứ 3" },
    { id: 3, label: "Thứ 4" },
    { id: 4, label: "Thứ 5" },
    { id: 5, label: "Thứ 6" },
    { id: 6, label: "Thứ 7" },
    { id: 0, label: "Chủ Nhật" },
];

const scheduleSchema = z.object({
    title: z.string().min(1, "Tên sự kiện không được để trống"),
    days: z
        .array(z.number())
        .min(1, "Vui lòng chọn ít nhất một ngày trong tuần"),
    startTime: z
        .string()
        .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Sai định dạng giờ (HH:mm)"
        ),
    endTime: z
        .string()
        .regex(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Sai định dạng giờ (HH:mm)"
        ),
    repeatUntil: z.date(),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface ScheduleFormProps {
    onSubmit: (data: ScheduleFormValues) => void;
    initialValues?: Partial<ScheduleFormValues>;
    isPending?: boolean;
}

export function ScheduleForm({
    onSubmit,
    initialValues,
    isPending,
}: ScheduleFormProps) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ScheduleFormValues>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: initialValues || {
            days: [],
        },
        resetOptions: {
            keepDirtyValues: true,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="title">Tên sự kiện</Label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                    <p className="text-red-500 text-sm">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <Label>Ngày trong tuần</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {daysOfWeek.map((day) => (
                        <Controller
                            key={day.id}
                            name="days"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`day-${day.id}`}
                                        checked={field.value?.includes(day.id)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([
                                                      ...(field.value || []),
                                                      day.id,
                                                  ])
                                                : field.onChange(
                                                      field.value?.filter(
                                                          (value) =>
                                                              value !== day.id
                                                      )
                                                  );
                                        }}
                                    />
                                    <Label htmlFor={`day-${day.id}`}>
                                        {day.label}
                                    </Label>
                                </div>
                            )}
                        />
                    ))}
                </div>
                {errors.days && (
                    <p className="text-red-500 text-sm">
                        {errors.days.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="startTime">Giờ bắt đầu</Label>
                    <Input
                        id="startTime"
                        type="time"
                        {...register("startTime")}
                    />
                    {errors.startTime && (
                        <p className="text-red-500 text-sm">
                            {errors.startTime.message}
                        </p>
                    )}
                </div>
                <div>
                    <Label htmlFor="endTime">Giờ kết thúc</Label>
                    <Input id="endTime" type="time" {...register("endTime")} />
                    {errors.endTime && (
                        <p className="text-red-500 text-sm">
                            {errors.endTime.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <Label>Lặp lại cho đến</Label>
                <Controller
                    name="repeatUntil"
                    control={control}
                    render={({ field }) => (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Chọn một ngày</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    )}
                />
                {errors.repeatUntil && (
                    <p className="text-red-500 text-sm">
                        {errors.repeatUntil.message}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending
                    ? "Đang lưu..."
                    : initialValues
                    ? "Cập nhật"
                    : "Tạo mới"}
            </Button>
        </form>
    );
}
