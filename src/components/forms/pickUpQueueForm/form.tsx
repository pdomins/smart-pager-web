import { areaCode, pattern } from '@/lib/phone'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css' // no me borren esto que se pierde el estilo del phone input :)
import es from 'react-phone-input-2/lang/es.json'

type PickUpQueueFormParams = {
  email: string | undefined
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>
  name: string | undefined
  setName: React.Dispatch<React.SetStateAction<string | undefined>>
  phone: string | undefined
  setPhone: React.Dispatch<React.SetStateAction<string | undefined>>
  pickUpId: string
  setPickUpId: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

const PickUpQueueInnerForm = ({
  email,
  setEmail,
  name,
  setName,
  pickUpId,
  setPickUpId,
  description,
  setDescription,
  phone,
  setPhone,
}: PickUpQueueFormParams) => {
  return (
    <>
      {/* PickUpId */}
      <InputField
        label="Identificador de Pedido"
        type="text"
        placeholder="ABC-123"
        value={pickUpId}
        onChange={setPickUpId}
        required={false}
      />

      {/* Email */}
      <InputField
        label="Email"
        type="email"
        placeholder="ejemplo@mail.com"
        value={email || ''}
        onChange={setEmail}
        required={true}
      />

      {/* Nombre Completo */}
      <InputField
        label="Nombre Completo"
        type="text"
        placeholder="Su nombre y apellido"
        value={name || ''}
        onChange={setName}
        required={true}
      />

      {/* Número de Teléfono */}
      <div className="w-full px-3 md:mb-0 mb-0 pb-0">
        <LabelField label="Numero de Teléfono" required={true} />
        <PhoneInput
          inputProps={{
            required: true,
          }}
          onlyCountries={['ar']}
          country={'ar'}
          placeholder="+54 (11) 12345678"
          value={phone}
          onChange={(num) => {
            setPhone(num)
          }}
          isValid={(value) => {
            return pattern.test(value) || value === areaCode
          }}
          defaultErrorMessage="Número invalido"
          localization={es}
          containerStyle={{
            width: '100%',
            marginBottom: '0.75rem',
          }}
          inputStyle={{
            width: '100%',
            display: 'block', // block
            borderRadius: '0.375rem', // rounded
            boxShadow:
              '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // shadow
            outline: 'none', // focus:outline-none
            borderColor: '#DDEBF6', //'#D4E2EC',
          }}
        />
        <div
          className={`${!phone || (phone && pattern.test(phone)) || phone === areaCode ? 'text-gray-500 ' : 'text-red-500 '} text-sm italic mt-0 pt-0 mb-6`}
        >
          El número de telefono debe seguir el formato +(54) 11 2345-6789.
        </div>
      </div>

      {/* Descripción */}
      <div className="w-full px-3 mb-6 md:mb-0">
        <LabelField label="Descripción" />
        <textarea
          className="appearance-none block w-full bg-white-200 text-gray-700 border shadow rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          placeholder="Detalles adicionales"
          value={description || ' '}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </>
  )
}

interface InputFieldProps {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}
function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <LabelField label={label} required={required} />
      <input
        type={type}
        placeholder={placeholder}
        className="appearance-none block w-full bg-white-200 text-gray-700 border shadow rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </div>
  )
}

function LabelField({
  label,
  required = false,
}: {
  label: string
  required?: boolean
}) {
  return (
    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  )
}

export default PickUpQueueInnerForm
