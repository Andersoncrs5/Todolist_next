export interface TaskEntity {
    id: string
    name: string
    description: string
    isComplete: boolean
    createdAt: Date
    updatedAt: Date | undefined
}