import { useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useScheduleRules } from "@/hooks/useScheduleRules";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { CustomEvent } from "./CustomEvent";
import { ScheduleRuleList } from "./ScheduleRuleList";
import { ScheduleForm, ScheduleFormValues } from "./ScheduleForm";

const localizer = momentLocalizer(moment);

interface ScheduleRule {
    id: string;
    title: string;
    days: number[];
    startTime: string;
    endTime: string;
    repeatUntil: Date;
}

const generateEventsFromRule = (rule: ScheduleRule) => {
    const events = [];
    const { title, days, startTime, endTime, repeatUntil, id } = rule;
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    let current = moment().startOf("day");
    const end = moment(repeatUntil).endOf("day");

    while (current.isBefore(end)) {
        if (days.includes(current.day())) {
            const start = current
                .clone()
                .hour(startHour)
                .minute(startMinute)
                .toDate();
            const endEvent = current
                .clone()
                .hour(endHour)
                .minute(endMinute)
                .toDate();
            events.push({
                title,
                start,
                end: endEvent,
                allDay: false,
                resource: id,
            });
        }
        current.add(1, "day");
    }
    return events;
};

export function AppointmentCalendar() {
    const {
        rules,
        isLoading,
        isError,
        createRule,
        isCreating,
        updateRule,
        isUpdating,
        deleteRule,
        isDeleting,
    } = useScheduleRules();
    // const isMobile = useMediaQuery('(max-width: 768px)'); // Không cần nữa

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [selectedRule, setSelectedRule] = useState<ScheduleRule | null>(null);
    const [ruleToDelete, setRuleToDelete] = useState<string | null>(null);

    const handleFormSubmit = (data: ScheduleFormValues) => {
        const payload = {
            title: data.title,
            daysOfWeek: data.days,
            startTime: data.startTime,
            endTime: data.endTime,
            repeatUntilDate: data.repeatUntil.toISOString(),
        };
        if (formMode === "edit" && selectedRule) {
            updateRule(
                { id: selectedRule.id, data: payload },
                { onSuccess: () => setIsFormOpen(false) }
            );
        } else {
            createRule(payload, { onSuccess: () => setIsFormOpen(false) });
        }
    };

    const handleOpenEdit = (rule: ScheduleRule) => {
        setSelectedRule(rule);
        setFormMode("edit");
        setIsListOpen(false);
        setIsFormOpen(true);
    };

    const handleOpenCreate = () => {
        setSelectedRule(null);
        setFormMode("create");
        setIsFormOpen(true);
    };

    const handleDelete = () => {
        if (ruleToDelete) {
            deleteRule(ruleToDelete, {
                onSuccess: () => setRuleToDelete(null),
            });
        }
    };

    const events = useMemo(
        () => rules.flatMap(generateEventsFromRule),
        [rules]
    );

    if (isLoading) return <div>Đang tải lịch hẹn từ server...</div>;
    if (isError) return <div>Lỗi! Không thể tải dữ liệu lịch hẹn.</div>;

    return (
        <div>
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                <Button onClick={handleOpenCreate}>Tạo Lịch Hẹn Mới</Button>
                <Button variant="outline" onClick={() => setIsListOpen(true)}>
                    Quản lý Lịch
                </Button>
            </div>

            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {formMode === "edit"
                                ? "Chỉnh sửa lịch hẹn"
                                : "Tạo lịch hẹn mới"}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Điền thông tin vào form để tạo hoặc sửa lịch hẹn.
                        </DialogDescription>
                    </DialogHeader>
                    <ScheduleForm
                        onSubmit={handleFormSubmit}
                        initialValues={
                            formMode === "edit" ? selectedRule : undefined
                        }
                        isPending={isCreating || isUpdating}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={isListOpen} onOpenChange={setIsListOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Quản lý Lịch hẹn</DialogTitle>
                        <DialogDescription className="sr-only">
                            Danh sách các lịch hẹn đã tạo. Bạn có thể sửa hoặc
                            xóa chúng từ đây.
                        </DialogDescription>
                    </DialogHeader>
                    <ScheduleRuleList
                        rules={rules}
                        onEdit={handleOpenEdit}
                        onDelete={(ruleId) => setRuleToDelete(ruleId)}
                    />
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={ruleToDelete !== null}
                onOpenChange={(isOpen) => !isOpen && setRuleToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Bạn có chắc chắn muốn xóa?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Hành động này không thể hoàn tác. Lịch hẹn sẽ bị xóa
                            vĩnh viễn.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Đang xóa..." : "Tiếp tục xóa"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="h-[70vh]">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={["month", "week", "day", "agenda"]} // Thêm tất cả các chế độ xem
                    defaultView="month" // Đặt chế độ xem mặc định là tháng
                    components={{
                        event: CustomEvent,
                    }}
                />
            </div>
        </div>
    );
}
