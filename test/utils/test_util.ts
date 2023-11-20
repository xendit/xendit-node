export class TestUtil {
    public static generateUniqueIdForBusiness(business_id: string) {
        return `${business_id}-${Date.now().toString()}`
    }
}
