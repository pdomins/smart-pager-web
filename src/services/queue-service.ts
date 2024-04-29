import { CommensalData } from '@/types/queues'
import { callCommensal as kvCallCommensal } from './kv/commensal-queue-service'
import { sendTableReadyEmail } from '@/repositories/email-repository'

export default async function callCommensal({
  restaurantName,
  restaurantSlug,
  client,
}: {
  restaurantName: string
  restaurantSlug: string
  client: CommensalData
}) {
  await kvCallCommensal({ restaurantSlug, client })
  await sendTableReadyEmail({ restaurantName, ...client })
  // add metrics logic here
}
