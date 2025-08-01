// src/lib/api.ts

// Định nghĩa kiểu dữ liệu cho một quy tắc nhận về từ backend
// (thường có _id, createdAt, ...)
export interface ScheduleRuleFromApi {
    _id: string;
    userId: string;
    title: string;
    daysOfWeek: number[];
    startTime: string;
    endTime: string;
    repeatUntilDate: string; // Dữ liệu ngày tháng từ API thường là chuỗi ISO
    createdAt: string;
    updatedAt: string;
}

// Định nghĩa kiểu dữ liệu để gửi lên backend khi tạo mới hoặc cập nhật
export type UpsertScheduleRule = Omit<
    ScheduleRuleFromApi,
    "_id" | "userId" | "createdAt" | "updatedAt"
>;

const API_BASE_URL = "/api"; // Thay bằng URL backend thật của bạn

/**
 * Lấy danh sách tất cả các quy tắc lịch hẹn từ backend.
 */
export const getScheduleRules = async (): Promise<ScheduleRuleFromApi[]> => {
    console.log("FETCHING data using React Query...");
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockApiResponse: ScheduleRuleFromApi[] = [
        {
            _id: "63f8b3b3c3b3c3b3c3b3c3b1",
            userId: "user123",
            title: "Họp team (từ React Query)",
            daysOfWeek: [1, 5],
            startTime: "09:00",
            endTime: "10:00",
            repeatUntilDate: "2025-12-31T00:00:00.000Z",
            createdAt: "2025-08-01T10:00:00.000Z",
            updatedAt: "2025-08-01T10:00:00.000Z",
        },
    ];
    return mockApiResponse;
};

/**
 * Tạo một quy tắc lịch hẹn mới.
 * @param newRule Dữ liệu của quy tắc mới
 */
export const createScheduleRule = async (
    newRule: UpsertScheduleRule
): Promise<ScheduleRuleFromApi> => {
    console.log("CREATING data using React Query Mutation...");
    await new Promise((resolve) => setTimeout(resolve, 800));
    const createdRule: ScheduleRuleFromApi = {
        _id: new Date().toISOString(),
        userId: "user123",
        ...newRule,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    return createdRule;
};

/**
 * Cập nhật một quy tắc lịch hẹn.
 * @param payload Dữ liệu cập nhật bao gồm id và data
 */
export const updateScheduleRule = async (payload: {
    id: string;
    data: UpsertScheduleRule;
}): Promise<ScheduleRuleFromApi> => {
    console.log(`UPDATING rule ${payload.id} using React Query Mutation...`);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const updatedRule: ScheduleRuleFromApi = {
        _id: payload.id,
        userId: "user123",
        ...payload.data,
        createdAt: new Date().toISOString(), // Giả lập
        updatedAt: new Date().toISOString(),
    };
    return updatedRule;
};

/**
 * Xóa một quy tắc lịch hẹn.
 * @param ruleId ID của quy tắc cần xóa
 */
export const deleteScheduleRule = async (
    ruleId: string
): Promise<{ message: string }> => {
    console.log(`DELETING rule ${ruleId} using React Query Mutation...`);
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { message: "Rule deleted successfully" };
};
