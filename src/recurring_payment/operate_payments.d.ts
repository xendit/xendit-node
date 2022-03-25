export function stopPayment(data: { id: string }): Promise<object>;

export function pausePayment(data: { id: string }): Promise<object>;

export function resumePayment(data: { id: string }): Promise<object>;
