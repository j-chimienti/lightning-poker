export async function oauthLogin(provider, params) {

    return fetch(`/api/callback/${provider}${params}`).then((res) => res.json())
}


/**
 *
 * @returns {Promise<Response>}
 * {
  "playerAccount" : {
    "email" : "session-RxFZF_PadI6rUurly13DHA==",
    "createdAt" : "2022-09-13T22:40:12.076092Z",
    "picture" : null,
    "sessionId" : "HzS81LvVawm9Qb7njU_GWA=="
  }
}
 todo: add profileId, balance,
 */
export async function resumeSession() {
    return fetch("/api/resumeSession").then(r => r.json()).then(pa => {
        return Object.assign(pa.playerAccount, {profileId: pa.playerAccount.id})
    })
}

export async function signup(email, password) {
    return fetch('/api/signup', { method: 'post',
        body: JSON.stringify({ password: password, email }), headers: { 'content-type': 'application/json' } })
}

export async function login(body) {
    return fetch('/api/login', { method: 'post', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } })
}

export async function logout() {
    return fetch('/api/logout', { method: 'post' })
}




export const fetchTable = async (tableId) => {
    return await fetch("/api/tables/" + tableId).then((raw) => raw.json())
};

export const fetchPlayers =  async (tableId, profileHash) => {
    const table = await fetch(`/api/tables/${tableId}/players`).then(r => r.json())
    let players = {};
    let me;
    table.posMap.forEach((doc) => {
        const position = doc.position;
        if (profileHash === doc.profileHash) {
            me = players[position];
        }
    });
    return {players, me, loading: false};
};

export const fetchTables = (limit = 20) => {
    return fetch("/api/tables?limit=" + limit).then(res => res.json())
};