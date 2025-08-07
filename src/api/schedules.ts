import apiClient from "../lib/api";

// Type for the data sent to create or update a rule
export interface UpsertScheduleRule {
    title: string;
    daysOfWeek: number[];
    startTime: string;
    endTime: string;
    repeatUntilDate: string; // Sending date as ISO string
}

// Type for the data received from the API
export interface ScheduleRule extends UpsertScheduleRule {
    _id: string;
}

/**
 * Fetches all schedule rules from the backend.
 */
export const getScheduleRules = async (): Promise<ScheduleRule[]> => {
    const response = await apiClient.get("/schedules");
    return response.data;
};

/**
 * Creates a new schedule rule.
 * @param ruleData - The data for the new rule.
 */
export const createScheduleRule = async (
    ruleData: UpsertScheduleRule
): Promise<ScheduleRule> => {
    const response = await apiClient.post("/schedules", ruleData);
    return response.data;
};

/**
 * Updates an existing schedule rule.
 * @param param0 - An object containing the rule ID and the new data.
 */
export const updateScheduleRule = async ({
    id,
    ...ruleData
}: { id: string } & UpsertScheduleRule): Promise<ScheduleRule> => {
    const response = await apiClient.put(`/schedules/${id}`, ruleData);
    return response.data;
};

/**
 * Deletes a schedule rule.
 * @param id - The ID of the rule to delete.
 */
export const deleteScheduleRule = async (id: string): Promise<void> => {
    await apiClient.delete(`/schedules/${id}`);
};
