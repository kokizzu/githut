import React, { useState, useEffect } from "react"
import ReactSelect from "react-select"
import { range, toString } from "lodash/fp"
import { getMaxDataDate } from "../utils.js"
import "react-select/dist/react-select.css"

export default function Select(props) {
    const year = props.year
    const [state, setState] = useState({})

    function vals(start, end) {
        return range(--start, end).map((i) => ({
            value: toString(i + 1),
            label: toString(i + 1),
        }))
    }

    function setValue(value) {
        const [_, dispatch] = props.hist

        if (year) {
            // props.hist.data.year = value
            dispatch({ type: 'setYear', payload: value });
        } else {
            dispatch({ type: 'setQuarter', payload: value });
            // props.hist.data.quarter = value
        }
        setState({ ...state, value: value })
    }

    useEffect(() => {
        getMaxDataDate().then((maxDate) => {
            setState({
                ...state,
                options: year ? vals(2014, maxDate.year) : vals(1, 4),
                value: year
                    ? props.match.params.year
                    : props.match.params.quarter,
            })
        })
        const { params } = props.match
        const value = year ? params.year : params.quarter
        setValue(value)
    }, [])

    function histPush(x, y, z) {
        props.history.push("/" + x + "/" + y + "/" + z)
    }

    function onChange(value) {
        const { params } = props.match
        setValue(value)
        if (year) {
            histPush(params.event, value, params.quarter)
        } else {
            histPush(params.event, params.year, value)
        }
    }

    if (!state) return null
    return (
        <div>
            <h4 className="section-heading">{year ? "Year" : "Quarter"}</h4>
            <ReactSelect
                label="States"
                onChange={onChange}
                options={state.options}
                simpleValue
                searchable={false}
                clearable={false}
                value={state.value}
            />
        </div>
    )
}
