import React, { useState } from "react";
import { User } from "./services/User";

const capitalize = (letter: string) => letter.toUpperCase()
const capitalizeFirst = (word: string) => capitalize(word[0]) + word.slice(1)
export function Username({ user, makeEditable, onSetUsername, editable }: {
    user: User;
    onSetUsername: (username: string) => void;
    makeEditable: (editable: boolean) => void;
    editable: boolean;
}) {
    const [name, setName] = useState(user.name);
    const setUsername = (name: string) => {
        makeEditable(false);
        name
            ? onSetUsername(name)
            : (user.name && onSetUsername(user.name));
    };
    let usernameInput = <input
        className="App-input Username"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && setUsername(name)}
        onBlur={(e) => setUsername(e.target.value)}
    />;
    return editable
        ? <span>{usernameInput}</span>
        : <span className='username-span' onClick={(e) => makeEditable(true)}>
            {user.name ? capitalizeFirst(user.name) : "?"}
        </span>;
}
