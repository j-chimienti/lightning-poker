
export const fetchTable = async (tableId) => {
    // value is a DocumentSnapshot
    const {table, loading, error} = await fetch("/tables/" + tableId)
        .then((raw) => raw.json())
    return {table, loading, error};
};

export const fetchPlayers =  async (tableId, profileHash) => {
    const [value, loading, error] = await fetch("/players/table/" + tableId)

    if (error) {
        console.log(error);
    }

    let players = {};
    let me;

    if (!loading) {
        if (value) {
            value.forEach((doc) => {
                const position = doc.get("position");
                players[position] = Object.assign({}, doc.data(), {
                    id: doc.ref.id,
                });
                if (profileHash === doc.get("profileHash")) {
                    me = players[position];
                }
            });
        }
    }
    return {players, me, loading};
};

export const fetchTables = (limit = 20) => {
    return fetch("/tables?limit=" + limit).then(res => res.json())
};