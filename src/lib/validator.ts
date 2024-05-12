import { HTTP_RESPONSE_STATUS } from '@/types/https'
import { NextRequest, NextResponse } from 'next/server'
import * as yup from 'yup'
import { AnyObject, Maybe } from 'yup'

export const validateSchema = async <T extends Maybe<AnyObject>>({
  schema,
  req,
}: {
  schema: yup.ObjectSchema<T>
  req: NextRequest
}) => {
  try {
    const validatedData = await schema.validate(await req.json(), {
      abortEarly: false,
    })
    return { data: validatedData, res: null }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return {
        data: null,
        res: NextResponse.json(
          { error: 'Invalid params', details: error.errors },
          {
            status: HTTP_RESPONSE_STATUS.BAD_REQUEST,
          }
        ),
      }
    }
    return {
      data: null,
      res: NextResponse.json(
        { error: 'Server Error' },
        { status: HTTP_RESPONSE_STATUS.SERVICE_UNAVAILABLE }
      ),
    }
  }
}
