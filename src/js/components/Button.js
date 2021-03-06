/**
 * Material button to select the data set
 * @author Fabian Beuke <mail@beuke.org>
 * @license AGPL-3.0
 */

import React, { useEffect, useState } from "react"
import { Button as MaterialButton } from "react-materialize"

export default function Button({ match, store, history }) {
    const [state, setState] = useState([
        "pushes",
        "stars",
        "issues",
        "pull_requests",
    ])

    useEffect(() => {
        store[1]({ type: match.params.event })
    }, [match.params.event])

    function next() {
        const rotateRight = (a) => [...a.slice(1, a.length), a[0]]
        setState(rotateRight(state))
        history.push(
            "/" +
                state[0] +
                "/" +
                match.params.year +
                "/" +
                match.params.quarter
        )
    }

    return (
        <div>
            <center>
                <MaterialButton
                    className={
                        "waves-effect waves-light blue-grey lighten-2 btn"
                    }
                    onClick={next}
                >
                    {store[0].name}
                </MaterialButton>
            </center>
        </div>
    )
}
