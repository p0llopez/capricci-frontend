import { format } from "date-fns"

import type { BasicOrder } from "@/types/Order"

export default function OrderCard(order: BasicOrder) {
  return (
    <div className="flex w-full flex-col items-center gap-2 rounded-lg border px-2 py-2 transition md:grid md:grid-cols-6">
      <h4 className="col-span-2 hidden overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold text-bluegray md:block">
        {order.id}
      </h4>
      <p className="text-center">Fecha: {format(new Date(order.created_at), "dd/MM/yyyy")}</p>
      <p className="text-center">Estado: {order.status}</p>
      <p className="text-center text-xl font-bold">{order.total_price} €</p>
      <a
        href={`profile/order/${order.id}`}
        className="w-full rounded-md bg-bluegray p-2 font-semibold text-beige transition hover:bg-bluegray-70 focus:outline-none"
      >
        <p className="text-center">Ver detalles</p>
      </a>
    </div>
  )
}
