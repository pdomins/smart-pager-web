export type PaginationResult = {
  emails: string[]
  size: number
} | null

export type CommensalDataParams = {
  name: string
  groupSize: string
  phoneNumber: string
  description: string
}

export type CommensalData = CommensalDataParams & {
  joinedAt: Date
  email: string
  timesCalled: number
}

export type PickUpDataParams = {
  name: string
  pickupId: string
  phoneNumber: string
}

export type PickUpData = PickUpDataParams & {
  joinedAt: Date
  email: string
  timesCalled: number
}
