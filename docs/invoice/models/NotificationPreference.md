# NotificationPreference

An object representing notification preferences for different invoice events.

## Properties

| Name | Type | Required | Description |
| ------------ | ------------- | ------------- | ------------- |
| **invoiceCreated** | [[]NotificationChannel](NotificationChannel.md) |  | Notification channels for when an invoice is created. |
**invoiceReminder** | [[]NotificationChannel](NotificationChannel.md) |  | Notification channels for invoice reminders. |
**invoiceExpired** | [[]NotificationChannel](NotificationChannel.md) |  | Notification channels for expired invoices. |
**invoicePaid** | [[]NotificationChannel](NotificationChannel.md) |  | Notification channels for when an invoice is paid. |


