export type PaginationResult = {
  emails: string[]
  size: number
} | null

export type CommensalDataParams = {
  name: string
  groupSize: string
  phoneNumber: string
  description: string
  mobileAuthToken?: string
  messagingToken?: string
}

export type CommensalData = CommensalDataParams & {
  joinedAt: Date
  email: string
  timesCalled: number
  authToken: string
}

export type PickUpDataParams = {
  name: string
  pickUpId: string
  phoneNumber: string
  description: string
}

export type PickUpData = PickUpDataParams & {
  joinedAt: Date
  email: string
  timesCalled: number
}
