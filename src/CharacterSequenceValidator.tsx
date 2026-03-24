import { useEffect, useMemo } from 'react'
import type { CharacterSequenceValidation, PasswordData } from './passwordTypes'

type CharacterSequenceValidatorProps = {
  passwordData: PasswordData
  onValidationChange: (result: CharacterSequenceValidation) => void
}

const EMPTY_RESULT: CharacterSequenceValidation = {
  isValid: false,
  sequenceCount: 0,
  message: 'Zadejte heslo pro kontrolu sekvence.',
}

function CharacterSequenceValidator({ passwordData, onValidationChange }: CharacterSequenceValidatorProps) {
  const result = useMemo<CharacterSequenceValidation>(() => {
    const password = passwordData.value
    if (!password) return EMPTY_RESULT

    const pattern = /(?=([a-z][A-Z]\d[!@#$%^&*]))/g
    const matches = password.match(pattern)
    const sequenceCount = matches ? matches.length : 0

    return {
      isValid: sequenceCount > 0,
      sequenceCount,
      message:
        sequenceCount > 0
          ? `Nalezena validní sekvence typu malý-velký-číslo-speciální: ${sequenceCount}x`
          : 'Nebyla nalezena sekvence malý-velký-číslo-speciální znak za sebou.',
    }
  }, [passwordData.value])

  useEffect(() => {
    onValidationChange(result)
  }, [onValidationChange, result])

  return (
    <section className="validator-card card shadow-sm">
      <h2>Sekvenční validace</h2>
      <p className={result.isValid ? 'success' : 'warning'}>{result.message}</p>
    </section>
  )
}

export default CharacterSequenceValidator
