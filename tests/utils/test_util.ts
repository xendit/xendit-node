export class TestUtil {
    public static generateUniqueIdForBusiness(busines_id: string) {
        return `${busines_id}-${Date.now().toString()}`
    }
}
