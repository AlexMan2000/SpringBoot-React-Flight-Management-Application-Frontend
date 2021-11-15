import {agentInterfaceColumns} from "../../lib/flightData";
import ViewFlights from "../flight/ViewFlights";

export default function CustomerOrders() {
    return (
        <ViewFlights columns={agentInterfaceColumns} />
    )
}