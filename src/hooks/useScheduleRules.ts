// src/hooks/useScheduleRules.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getScheduleRules,
    createScheduleRule,
    updateScheduleRule,
    deleteScheduleRule,
} from "@/api/schedules";

/**
 * Custom hook để quản lý dữ liệu và các hành động liên quan đến các quy tắc lịch hẹn.
 */
export const useScheduleRules = () => {
    const queryClient = useQueryClient();

    // 1. Query để lấy danh sách các quy tắc
    const {
        data: rules = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["scheduleRules"], // Khóa cache
        queryFn: getScheduleRules, // Hàm gọi API
        // Chuyển đổi dữ liệu trả về từ API cho phù hợp với frontend
        select: (data) =>
            data.map((rule) => ({
                id: rule._id,
                title: rule.title,
                days: rule.daysOfWeek,
                startTime: rule.startTime,
                endTime: rule.endTime,
                repeatUntil: new Date(rule.repeatUntilDate),
            })),
    });

    // 2. Mutation để tạo mới một quy tắc
    const { mutate: createRule, isPending: isCreating } = useMutation({
        mutationFn: createScheduleRule,
        // Khi thành công, làm mới lại query 'scheduleRules' để UI tự động cập nhật
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scheduleRules"] });
        },
    });

    // 3. Mutation để cập nhật một quy tắc
    const { mutate: updateRule, isPending: isUpdating } = useMutation({
        mutationFn: updateScheduleRule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scheduleRules"] });
        },
    });

    // 4. Mutation để xóa một quy tắc
    const { mutate: deleteRule, isPending: isDeleting } = useMutation({
        mutationFn: deleteScheduleRule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["scheduleRules"] });
        },
    });

    // Trả về tất cả dữ liệu và các hàm cần thiết cho component
    return {
        rules,
        isLoading,
        isError,
        createRule,
        isCreating,
        updateRule,
        isUpdating,
        deleteRule,
        isDeleting,
    };
};
