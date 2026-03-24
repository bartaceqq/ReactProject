import { useEffect, useMemo, useState } from 'react'
import type { CountryFlagValidation, PasswordData } from './passwordTypes'

type CountryFlagValidatorProps = {
  passwordData: PasswordData
  onValidationChange: (result: CountryFlagValidation) => void
}

const countries = [
  'AD',
  'AE',
  'AF',
  'AG',
  'AI',
  'AL',
  'AM',
  'AO',
  'AQ',
  'AR',
  'AS',
  'AT',
  'AU',
  'AW',
  'AX',
  'AZ',
  'BA',
  'BB',
  'BD',
  'BE',
  'BF',
  'BG',
  'BH',
  'BI',
  'BJ',
  'BL',
  'BM',
  'BN',
  'BO',
  'BQ',
  'BR',
  'BS',
  'BT',
  'BV',
  'BW',
  'BY',
  'BZ',
  'CA',
  'CC',
  'CD',
  'CF',
  'CG',
  'CH',
  'CI',
  'CK',
  'CL',
  'CM',
  'CN',
  'CO',
  'CR',
  'CU',
  'CV',
  'CW',
  'CX',
  'CY',
  'CZ',
  'DE',
  'DJ',
  'DK',
  'DM',
  'DO',
  'DZ',
  'EC',
  'EE',
  'EG',
  'EH',
  'ER',
  'ES',
  'ET',
  'FI',
  'FJ',
  'FK',
  'FM',
  'FO',
  'FR',
  'GA',
  'GB',
  'GD',
  'GE',
  'GF',
  'GG',
  'GH',
  'GI',
  'GL',
  'GM',
  'GN',
  'GP',
  'GQ',
  'GR',
  'GS',
  'GT',
  'GU',
  'GW',
  'GY',
  'HK',
  'HM',
  'HN',
  'HR',
  'HT',
  'HU',
  'ID',
  'IE',
  'IL',
  'IM',
  'IN',
  'IO',
  'IQ',
  'IR',
  'IS',
  'IT',
  'JE',
  'JM',
  'JO',
  'JP',
  'KE',
  'KG',
  'KH',
  'KI',
  'KM',
  'KN',
  'KP',
  'KR',
  'KW',
  'KY',
  'KZ',
  'LA',
  'LB',
  'LC',
  'LI',
  'LK',
  'LR',
  'LS',
  'LT',
  'LU',
  'LV',
  'LY',
  'MA',
  'MC',
  'MD',
  'ME',
  'MF',
  'MG',
  'MH',
  'MK',
  'ML',
  'MM',
  'MN',
  'MO',
  'MP',
  'MQ',
  'MR',
  'MS',
  'MT',
  'MU',
  'MV',
  'MW',
  'MX',
  'MY',
  'MZ',
  'NA',
  'NC',
  'NE',
  'NF',
  'NG',
  'NI',
  'NL',
  'NO',
  'NP',
  'NR',
  'NU',
  'NZ',
  'OM',
  'PA',
  'PE',
  'PF',
  'PG',
  'PH',
  'PK',
  'PL',
  'PM',
  'PN',
  'PR',
  'PS',
  'PT',
  'PW',
  'PY',
  'QA',
  'RE',
  'RO',
  'RS',
  'RU',
  'RW',
  'SA',
  'SB',
  'SC',
  'SD',
  'SE',
  'SG',
  'SH',
  'SI',
  'SJ',
  'SK',
  'SL',
  'SM',
  'SN',
  'SO',
  'SR',
  'SS',
  'ST',
  'SV',
  'SX',
  'SY',
  'SZ',
  'TC',
  'TD',
  'TF',
  'TG',
  'TH',
  'TJ',
  'TK',
  'TL',
  'TM',
  'TN',
  'TO',
  'TR',
  'TT',
  'TV',
  'TW',
  'TZ',
  'UA',
  'UG',
  'UM',
  'US',
  'UY',
  'UZ',
  'VA',
  'VC',
  'VE',
  'VG',
  'VI',
  'VN',
  'VU',
  'WF',
  'WS',
  'YE',
  'YT',
  'ZA',
  'ZM',
  'ZW',
]

function getRandomCountry() {
  return countries[Math.floor(Math.random() * countries.length)]
}

function CountryFlagValidator({ passwordData, onValidationChange }: CountryFlagValidatorProps) {
  const [selectedCountry] = useState(getRandomCountry)
  const [hasImageError, setHasImageError] = useState(false)

  const flagUrl = `https://countryflagsapi.netlify.app/flag/${selectedCountry}.svg`

  const result = useMemo<CountryFlagValidation>(() => {
    const normalizedPassword = passwordData.value.toUpperCase()

    if (!passwordData.value) {
      return {
        isValid: false,
        countryCode: selectedCountry,
        flagUrl,
        message: `Zadejte heslo a vložte do něj zkratku země ${selectedCountry}.`,
      }
    }

    const containsCountryCode = normalizedPassword.includes(selectedCountry)

    return {
      isValid: containsCountryCode,
      countryCode: selectedCountry,
      flagUrl,
      message: containsCountryCode
        ? `Heslo obsahuje zkratku země ${selectedCountry}.`
        : `Heslo neobsahuje zkratku země ${selectedCountry}.`,
    }
  }, [flagUrl, passwordData.value, selectedCountry])

  useEffect(() => {
    onValidationChange(result)
  }, [onValidationChange, result])

  return (
    <section className="validator-card card shadow-sm">
      <div className="flag-header">
        <div>
          <h2>Validace vlajky státu</h2>
          <p className="flag-instruction">
            Heslo musí obsahovat zkratku země <strong>{selectedCountry}</strong>.
          </p>
        </div>
        {!hasImageError ? (
          <img
            className="flag-preview"
            src={flagUrl}
            alt={`Vlajka země ${selectedCountry}`}
            width="64"
            height="48"
            loading="lazy"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="flag-fallback" aria-label={`Vlajka pro ${selectedCountry} není dostupná`}>
            {selectedCountry}
          </div>
        )}
      </div>
      <p className={result.isValid ? 'success' : 'warning'}>{result.message}</p>
    </section>
  )
}

export default CountryFlagValidator
