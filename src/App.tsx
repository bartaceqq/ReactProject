import { useState } from 'react'
import CharacterSequenceValidator from './CharacterSequenceValidator'
import CountryFlagValidator from './CountryFlagValidator'
import PasswordInput from './PasswordInput'
import PasswordStrength from './PasswordStrength'
import PasswordTimeValidator from './PasswordTimeValidator'
import type {
  CharacterSequenceValidation,
  CountryFlagValidation,
  PasswordData,
  PasswordTimeValidation,
} from './passwordTypes'

const INITIAL_PASSWORD_DATA: PasswordData = {
  value: '',
  createdAt: null,
  updatedAt: null,
}

const INITIAL_SEQUENCE_RESULT: CharacterSequenceValidation = {
  isValid: false,
  sequenceCount: 0,
  message: '',
}

const INITIAL_TIME_RESULT: PasswordTimeValidation = {
  isValid: false,
  elapsedMs: 0,
  minMs: 5000,
  message: '',
}

const INITIAL_COUNTRY_RESULT: CountryFlagValidation = {
  isValid: false,
  countryCode: '',
  flagUrl: '',
  message: '',
}

function App() {
  const [passwordData, setPasswordData] = useState<PasswordData>(INITIAL_PASSWORD_DATA)
  const [sequenceValidation, setSequenceValidation] = useState<CharacterSequenceValidation>(INITIAL_SEQUENCE_RESULT)
  const [timeValidation, setTimeValidation] = useState<PasswordTimeValidation>(INITIAL_TIME_RESULT)
  const [countryValidation, setCountryValidation] = useState<CountryFlagValidation>(INITIAL_COUNTRY_RESULT)

  const setPassword = (value: string) => {
    if (!value) {
      setPasswordData(INITIAL_PASSWORD_DATA)
      return
    }

    setPasswordData((previous) => {
      const now = Date.now()
      return {
        value,
        createdAt: previous.value ? previous.createdAt : now,
        updatedAt: now,
      }
    })
  }

  return (
    <main className="app">
      <h1>Kontrola Síly Hesla</h1>
      <PasswordInput passwordData={passwordData} setPassword={setPassword} />
      <CharacterSequenceValidator passwordData={passwordData} onValidationChange={setSequenceValidation} />
      <PasswordTimeValidator passwordData={passwordData} windowMs={5000} onValidationChange={setTimeValidation} />
      <CountryFlagValidator passwordData={passwordData} onValidationChange={setCountryValidation} />
      <PasswordStrength
        passwordData={passwordData}
        sequenceValidation={sequenceValidation}
        timeValidation={timeValidation}
        countryValidation={countryValidation}
      />
    </main>
  )
}

export default App
