export interface TaskEntity {
    id: string
    name: string
    description: string
    IsComplete: string
    createdAt: Date
    updatedAt: Date | undefined
}