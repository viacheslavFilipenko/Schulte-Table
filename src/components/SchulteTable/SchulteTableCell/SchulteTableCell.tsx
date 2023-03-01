import React, {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {startTimeAtom} from "../SchulteTable.atom";

type SchulteTableCellProps = {
    countNumber: number;
    onClick: (countNumber: number) => boolean;
}

export const SchulteTableCell = ({ countNumber, onClick }: SchulteTableCellProps) => {
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState(false);
    const startTime=  useRecoilValue(startTimeAtom);

    useEffect(() => {
        if (startTime) {
            setChecked(false);
        }
    }, [startTime])

    const handleClick = () => {
        const matched = onClick(countNumber);

        if (matched) {
            setChecked(true);
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 600);
        }
    }

    let className = checked ? 'checked cell' : 'cell';
    className += error ? ' error' : '';

    return <div className={className} onClick={handleClick}>
        {countNumber}
    </div>
}