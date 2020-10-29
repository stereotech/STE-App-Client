export enum CloudConnectionAction {
    Accept,
    Reject
}

export interface AcceptOrRejectBody {
    action: CloudConnectionAction
}