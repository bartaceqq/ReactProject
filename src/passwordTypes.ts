export type PasswordData = {
  value: string
  createdAt: number | null
  updatedAt: number | null
}

export type CharacterSequenceValidation = {
  isValid: boolean
  sequenceCount: number
  message: string
}

export type PasswordTimeValidation = {
  isValid: boolean
  elapsedMs: number
  minMs: number
  message: string
}

export type CountryFlagValidation = {
  isValid: boolean
  countryCode: string
  flagUrl: string
  message: string
}
