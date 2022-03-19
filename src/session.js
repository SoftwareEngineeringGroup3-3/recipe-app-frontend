import { createContext } from "react";
import { apiUrl } from "./api";

export class UserSession {
    static empty() {
        return new UserSession(null);
    }

    constructor(token) {
        this.token = token;
    }

    get valid() {
        return !!this.token;
    }
}

export const SessionContext = createContext({
    session: UserSession.empty(),
    setSession: () => {}
});