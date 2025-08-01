// src/components/common/ScheduleRuleList.tsx
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import moment from "moment";

// Lấy lại kiểu ScheduleRule từ AppointmentCalendar
interface ScheduleRule {
    id: string;
    title: string;
    days: number[];
    startTime: string;
    endTime: string;
    repeatUntil: Date;
}

interface ScheduleRuleListProps {
    rules: ScheduleRule[];
    onEdit: (rule: ScheduleRule) => void;
    onDelete: (ruleId: string) => void;
}

const dayMap: { [key: number]: string } = {
    0: "CN",
    1: "T2",
    2: "T3",
    3: "T4",
    4: "T5",
    5: "T6",
    6: "T7",
};

export function ScheduleRuleList({
    rules,
    onEdit,
    onDelete,
}: ScheduleRuleListProps) {
    if (rules.length === 0) {
        return (
            <p className="text-muted-foreground text-center">
                Chưa có lịch hẹn nào được tạo.
            </p>
        );
    }

    return (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
            {rules.map((rule) => (
                <Card key={rule.id}>
                    <CardHeader>
                        <CardTitle>{rule.title}</CardTitle>
                        <CardDescription>
                            Lặp lại cho đến{" "}
                            {moment(rule.repeatUntil).format("DD/MM/YYYY")}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold">Vào lúc:</span>
                            <span>
                                {rule.startTime} - {rule.endTime}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <span className="font-semibold">Các ngày:</span>
                            <div className="flex flex-wrap gap-1">
                                {rule.days.sort().map((day) => (
                                    <span
                                        key={day}
                                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs"
                                    >
                                        {dayMap[day]}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onEdit(rule)}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => onDelete(rule.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
